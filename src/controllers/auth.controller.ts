import { Response } from "express";
import { AuthService } from "../services/auth.service";
import { sendSuccess } from "../utils/responseHandler";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";
import { EmailService } from "../services/email.service";
import { OTPService } from "../services/otp.service";
import { TempUserRepository } from "../repositories/temp-user.repository";
import { AppError } from "../middlewares/error.middleware";
import bcrypt from "bcryptjs";
import { normalizeEmail } from "../utils/validators";

const authService = new AuthService();
const emailService = new EmailService();
const otpService = new OTPService();
const tempUserRepository = new TempUserRepository();

export class AuthController {
  /**
   * Step 1: Collect registration info and send OTP
   * POST /api/auth/register-step1
   */
  registerStep1 = async (req: AuthenticatedRequest, res: Response) => {
    const { fullName, email, password, username, phoneNumber } = req.body;

    // Normalize email
    const normalizedEmail = normalizeEmail(email);

    // Check if email already exists in users table
    const existingUser = await new (require("../repositories/user.repository").UserRepository)().findByEmail(
      normalizedEmail
    );
    if (existingUser) {
      throw new AppError(409, "Email is already registered");
    }

    // Check if username exists in users table
    if (username) {
      const existingUsername = await new (require("../repositories/user.repository").UserRepository)().findByUsername(
        username
      );
      if (existingUsername) {
        throw new AppError(409, "Username is already taken");
      }
    }

    // Delete old temp record if exists for this email
    const existingTempUser = await tempUserRepository.findByEmail(normalizedEmail);
    if (existingTempUser) {
      await tempUserRepository.delete(existingTempUser.tempUserId);
    }

    // Generate OTP
    const otp = otpService.generateOTP();
    const otpExpiresAt = otpService.getOTPExpiryTime();

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create temp user record
    const tempUser = await tempUserRepository.create({
      fullName,
      username: username || "",
      email: normalizedEmail,
      password: hashedPassword,
      otpCode: otp,
      otpExpiresAt,
    });

    // Send OTP email
    await emailService.sendOTPEmail(normalizedEmail, otp, fullName);

    return sendSuccess(res, 201, "OTP sent to your email address", {
      tempUserId: tempUser.tempUserId,
      email: normalizedEmail,
      expiresIn: "5 minutes",
      message: "Please check your email for the OTP code",
    });
  };

  /**
   * Step 2: Verify OTP and create account
   * POST /api/auth/verify-otp
   */
  verifyOTP = async (req: AuthenticatedRequest, res: Response) => {
    const { tempUserId, otpCode } = req.body;

    // Get temp user
    const tempUser = await tempUserRepository.findById(tempUserId);
    if (!tempUser) {
      throw new AppError(404, "Registration session not found. Please register again.");
    }

    // Check if max failed attempts reached
    if (otpService.isMaxAttemptsReached(tempUser.failedAttempts)) {
      await tempUserRepository.delete(tempUserId);
      throw new AppError(400, `Too many failed attempts. Please register again.`);
    }

    try {
      // Validate OTP
      otpService.validateOTP(otpCode, tempUser.otpCode, tempUser.otpExpiresAt);
    } catch (error) {
      // Increment failed attempts
      await tempUserRepository.incrementFailedAttempts(tempUserId);
      const updatedTempUser = await tempUserRepository.findById(tempUserId);

      if (updatedTempUser && otpService.isMaxAttemptsReached(updatedTempUser.failedAttempts)) {
        await tempUserRepository.delete(tempUserId);
        throw new AppError(
          400,
          "Too many failed OTP attempts. Please register again."
        );
      }

      throw error;
    }

    // Create account from temp user
    const user = await authService.createAccountFromTempUser(tempUserId);

    return sendSuccess(res, 201, "Account created successfully. Please login to continue.", {
      user: {
        userId: user.userId,
        fullName: user.fullName,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    });
  };

  /**
   * Step 3: Resend OTP
   * POST /api/auth/resend-otp
   */
  resendOTP = async (req: AuthenticatedRequest, res: Response) => {
    const { tempUserId } = req.body;

    // Get temp user
    const tempUser = await tempUserRepository.findById(tempUserId);
    if (!tempUser) {
      throw new AppError(404, "Registration session not found. Please register again.");
    }

    // Check if max failed attempts reached
    if (otpService.isMaxAttemptsReached(tempUser.failedAttempts)) {
      await tempUserRepository.delete(tempUserId);
      throw new AppError(400, "Too many failed attempts. Please register again.");
    }

    // Generate new OTP
    const newOtp = otpService.generateOTP();
    const newOtpExpiresAt = otpService.getOTPExpiryTime();

    // Update temp user with new OTP
    await tempUserRepository.update(tempUserId, {
      otpCode: newOtp,
      otpExpiresAt: newOtpExpiresAt,
      failedAttempts: 0, // Reset failed attempts
    });

    // Update last resend time
    await tempUserRepository.updateLastResendTime(tempUserId);

    // Send new OTP email
    await emailService.sendOTPEmail(tempUser.email, newOtp, tempUser.fullName);

    return sendSuccess(res, 200, "New OTP sent to your email address", {
      tempUserId,
      expiresIn: "5 minutes",
      message: "Check your email for the new OTP code",
    });
  };

  login = async (req: AuthenticatedRequest, res: Response) => {
    const data = await authService.login(req.body);
    return sendSuccess(res, 200, "Login successful", data);
  };

  changePassword = async (req: AuthenticatedRequest, res: Response) => {
    const result = await authService.changePassword(req.user!.userId, req.body);
    return sendSuccess(res, 200, "Password changed successfully", result);
  };
}
