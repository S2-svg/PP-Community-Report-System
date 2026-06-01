/**
 * Registration Input DTO
 * Validation Rules:
 * - fullName: Required, non-empty string
 * - email: Required, must be valid email format (RFC 5322)
 * - password: Required, must meet strength requirements:
 *   * Minimum 8 characters
 *   * Maximum 128 characters
 *   * At least 1 uppercase letter (A-Z)
 *   * At least 1 lowercase letter (a-z)
 *   * At least 1 number (0-9)
 *   * Special characters are optional
 * - username: Optional, non-empty if provided
 * - phoneNumber: Optional, non-empty if provided
 */
export interface RegisterInput {
  fullName: string;
  username?: string;
  email: string;
  password: string;
  phoneNumber?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}
