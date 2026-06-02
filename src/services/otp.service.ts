import { AppError } from "../middlewares/error.middleware";

export class OTPService {
  private readonly OTP_LENGTH = 6;
  private readonly OTP_EXPIRY_MINUTES = parseInt(process.env.OTP_EXPIRY_MINUTES || "5");
  private readonly MAX_FAILED_ATTEMPTS = parseInt(process.env.OTP_MAX_ATTEMPTS || "3");

  /**
   * Generate a random 6-digit OTP code
   */
  generateOTP(): string {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return otp;
  }

  /**
   * Calculate OTP expiry time (5 minutes from now)
   */
  getOTPExpiryTime(): Date {
    const expiryTime = new Date();
    expiryTime.setMinutes(expiryTime.getMinutes() + this.OTP_EXPIRY_MINUTES);
    return expiryTime;
  }

  /**
   * Check if OTP has expired
   */
  isOTPExpired(expiresAt: Date): boolean {
    return new Date() > expiresAt;
  }

  /**
   * Validate OTP code against stored code and expiry
   * @param inputOTP - User-provided OTP
   * @param storedOTP - OTP stored in database
   * @param expiresAt - OTP expiry timestamp
   */
  validateOTP(inputOTP: string, storedOTP: string, expiresAt: Date): void {
    // Check if OTP has expired
    if (this.isOTPExpired(expiresAt)) {
      throw new AppError(400, "OTP has expired. Please request a new one.");
    }

    // Check if OTP code matches
    if (inputOTP.trim() !== storedOTP.trim()) {
      throw new AppError(400, "Invalid OTP code.");
    }
  }

  /**
   * Check if max failed attempts reached
   */
  isMaxAttemptsReached(failedAttempts: number): boolean {
    return failedAttempts >= this.MAX_FAILED_ATTEMPTS;
  }

  /**
   * Get max failed attempts limit
   */
  getMaxFailedAttempts(): number {
    return this.MAX_FAILED_ATTEMPTS;
  }

  /**
   * Get OTP expiry minutes
   */
  getOTPExpiryMinutes(): number {
    return this.OTP_EXPIRY_MINUTES;
  }
}
