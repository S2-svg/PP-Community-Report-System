/**
 * Email and Password Validation Utilities
 * Provides validation functions for secure user authentication
 */

/**
 * Validates email format using RFC 5322 standards
 * @param email - Email address to validate
 * @returns true if email is valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') {
    return false;
  }

  // RFC 5322 simplified regex for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Normalizes email by trimming whitespace and converting to lowercase
 * @param email - Email address to normalize
 * @returns Normalized email address
 */
export const normalizeEmail = (email: string): string => {
  return email.trim().toLowerCase();
};

/**
 * Validates password strength requirements
 * Requirements:
 * - Minimum 8 characters
 * - Maximum 128 characters
 * - At least 1 uppercase letter (A-Z)
 * - At least 1 lowercase letter (a-z)
 * - At least 1 number (0-9)
 * - Special characters are optional
 *
 * @param password - Password to validate
 * @returns object with isValid boolean and reason string if invalid
 */
export const isValidPassword = (
  password: string
): { isValid: boolean; reason?: string } => {
  if (!password || typeof password !== 'string') {
    return { isValid: false, reason: 'Password is required' };
  }

  const passwordLength = password.length;

  if (passwordLength < 8) {
    return {
      isValid: false,
      reason: 'Password must be at least 8 characters long',
    };
  }

  if (passwordLength > 128) {
    return {
      isValid: false,
      reason: 'Password must not exceed 128 characters',
    };
  }

  if (!/[A-Z]/.test(password)) {
    return {
      isValid: false,
      reason: 'Password must contain at least 1 uppercase letter',
    };
  }

  if (!/[a-z]/.test(password)) {
    return {
      isValid: false,
      reason: 'Password must contain at least 1 lowercase letter',
    };
  }

  if (!/[0-9]/.test(password)) {
    return {
      isValid: false,
      reason: 'Password must contain at least 1 number',
    };
  }

  return { isValid: true };
};
