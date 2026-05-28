import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { asyncHandler } from "../middlewares/error.middleware";
import { authenticate } from "../middlewares/auth.middleware";
import { registerValidationRules, validate } from "../utils/validationRules";

const router = Router();
const controller = new AuthController();

router.post("/register", registerValidationRules(), validate, asyncHandler(controller.register));
router.post("/login", asyncHandler(controller.login));
router.patch("/change-password", authenticate, asyncHandler(controller.changePassword));

export default router;