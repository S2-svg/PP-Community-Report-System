import nodemailer from "nodemailer";
import { AppError } from "../middlewares/error.middleware";

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    // Force port 465 as a default fallback because cloud hosts (Render) block port 587/25 frequently
    const port = parseInt(process.env.SMTP_PORT || "465");
    const secure = process.env.SMTP_SECURE === "true" || port === 465;

    // Optional diagnostic log to help you debug on the Render console
    console.log(
      `[SMTP Init] Attempting connection to ${host}:${port} (Secure: ${secure})`,
    );

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      // CRITICAL: Prevent long hanging connections by forcing a fast timeout
      connectionTimeout: 8000, // 8 seconds
      greetingTimeout: 8000,
      socketTimeout: 10000,
    });
  }

  /**
   * Send OTP email to user
   * @param email - User email address
   * @param otp - 6-digit OTP code
   * @param fullName - User full name
   */
  async sendOTPEmail(
    email: string,
    otp: string,
    fullName: string,
  ): Promise<void> {
    try {
      const mailOptions = {
        from: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER,
        to: email,
        subject: "Email Verification - OTP Code",
        text: `Hello ${fullName},\n\nYour OTP (One-Time Password) for email verification is:\n\n${otp}\n\nThis code is valid for 5 minutes only.\n\nIf you did not request this code, please ignore this email.\n\nBest regards,\nCommunity Report System Team`,
      };

      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Email sending error:", error);
      throw new AppError(
        500,
        "Failed to send OTP email. Please try again later.",
      );
    }
  }

  /**
   * Verify SMTP connection (useful for testing)
   */
  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      return true;
    } catch (error) {
      console.error("SMTP connection error:", error);
      return false;
    }
  }
}
