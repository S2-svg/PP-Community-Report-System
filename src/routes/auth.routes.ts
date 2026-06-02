import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
// import { AuthVerificationController } from "../controllers/auth-verification.controller";
import { asyncHandler } from "../middlewares/error.middleware";
import { authenticate } from "../middlewares/auth.middleware";
import {
  registerValidationRules,
  otpVerificationRules,
  resendOtpRules,
  validate,
} from "../utils/validationRules";

const router = Router();
const controller = new AuthController();
// const verificationController = new AuthVerificationController();

// Registration flow with email verification
router.post("/register-step1", registerValidationRules(), validate, asyncHandler(controller.registerStep1));
router.post("/verify-otp", otpVerificationRules(), validate, asyncHandler(controller.verifyOTP));
router.post("/resend-otp", resendOtpRules(), validate, asyncHandler(controller.resendOTP));

// Login and password management
router.post("/login", asyncHandler(controller.login));
router.patch("/change-password", authenticate, asyncHandler(controller.changePassword));
router.post("/logout", authenticate, asyncHandler(controller.logout));

export default router;