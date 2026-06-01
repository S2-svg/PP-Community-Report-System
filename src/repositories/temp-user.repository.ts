import { AppDataSource } from "../config/data-source";
import { TempUser } from "../entities/TempUsers";
import { AppError } from "../middlewares/error.middleware";

export class TempUserRepository {
  private repository = AppDataSource.getRepository(TempUser);

  /**
   * Create a new temporary user record
   */
  async create(tempUserData: {
    fullName: string;
    username: string;
    email: string;
    password: string;
    otpCode: string;
    otpExpiresAt: Date;
  }): Promise<TempUser> {
    try {
      const tempUser = this.repository.create({
        ...tempUserData,
        isVerified: false,
        failedAttempts: 0,
      });
      return await this.repository.save(tempUser);
    } catch (error: any) {
      if (error.code === "ER_DUP_ENTRY" || error.message.includes("Duplicate entry")) {
        throw new AppError(409, "Email is already registered");
      }
      throw error;
    }
  }

  /**
   * Find temporary user by email
   */
  async findByEmail(email: string): Promise<TempUser | null> {
    return await this.repository.findOne({
      where: { email },
    });
  }

  /**
   * Find temporary user by ID
   */
  async findById(tempUserId: number): Promise<TempUser | null> {
    return await this.repository.findOne({
      where: { tempUserId },
    });
  }

  /**
   * Update temporary user record
   */
  async update(
    tempUserId: number,
    updateData: Partial<TempUser>
  ): Promise<TempUser | null> {
    await this.repository.update({ tempUserId }, updateData);
    return await this.findById(tempUserId);
  }

  /**
   * Increment failed OTP attempts
   */
  async incrementFailedAttempts(tempUserId: number): Promise<void> {
    await this.repository.increment({ tempUserId }, "failedAttempts", 1);
  }

  /**
   * Reset failed attempts to 0
   */
  async resetFailedAttempts(tempUserId: number): Promise<void> {
    await this.repository.update(
      { tempUserId },
      { failedAttempts: 0 }
    );
  }

  /**
   * Update last resend timestamp
   */
  async updateLastResendTime(tempUserId: number): Promise<void> {
    await this.repository.update(
      { tempUserId },
      { lastResendAt: new Date() }
    );
  }

  /**
   * Delete temporary user record (after successful verification)
   */
  async delete(tempUserId: number): Promise<void> {
    await this.repository.delete({ tempUserId });
  }

  /**
   * Check if email already exists in temp_users
   */
  async emailExists(email: string): Promise<boolean> {
    const count = await this.repository.count({ where: { email } });
    return count > 0;
  }

  /**
   * Delete old unverified records (older than 24 hours)
   */
  async deleteOldUnverifiedRecords(): Promise<void> {
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

    await this.repository.delete({
      isVerified: false,
      createdAt: {
        value: twentyFourHoursAgo,
        operator: "<",
      } as any,
    });
  }
}
