import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { asyncHandler } from "../middlewares/error.middleware";
import { authenticate } from "../middlewares/auth.middleware";
import {
  registerValidationRules,
  validate,
} from "../utils/validationRules";

const router = Router();
const controller = new AuthController();

// Registration and authentication
router.post("/register", registerValidationRules(), validate, asyncHandler(controller.register));
router.post("/login", asyncHandler(controller.login));
router.patch("/change-password", authenticate, asyncHandler(controller.changePassword));
router.post("/logout", authenticate, asyncHandler(controller.logout));

export default router;