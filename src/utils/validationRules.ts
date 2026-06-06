/**
 * Express Validator Rules for Authentication
 * Defines validation chains and error handling middleware
 */

import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

/**
 * Validation rules for user registration
 * - Email: required, must be valid format, normalized to lowercase
 * - Password: required, 8-128 chars, must contain uppercase, lowercase, and number
 * - Full Name: required, non-empty string
 * - Username: optional
 * - Phone Number: optional
 */
export const registerValidationRules = () => {
  return [
    body('fullName')
      .trim()
      .notEmpty()
      .withMessage('Full name is required'),
    
    body('email')
      .trim()
      .isEmail()
      .withMessage('Invalid email format')
      .normalizeEmail(),
    
    body('password')
      .isLength({ min: 8, max: 128 })
      .withMessage('Password must be between 8 and 128 characters')
      .matches(/[A-Z]/)
      .withMessage('Password must contain at least 1 uppercase letter')
      .matches(/[a-z]/)
      .withMessage('Password must contain at least 1 lowercase letter')
      .matches(/[0-9]/)
      .withMessage('Password must contain at least 1 number'),
    
    body('username')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Username cannot be empty if provided'),
    
    body('phoneNumber')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Phone number cannot be empty if provided'),
  ];
};

/**
 * Validation error handler middleware
 * Checks for validation errors and returns formatted response if any exist
 */
export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      message: 'Validation failed',
      errors: errors.array().map((err: any) => ({
        field: err.path || err.param,
        message: err.msg,
      })),
    });
  }
  
  next();
};

