import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { asyncHandler } from "../middlewares/error.middleware";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";

const router = Router();
const controller = new AuthController();

router.post("/register", asyncHandler(controller.register));
router.post("/login", asyncHandler(controller.login));
router.get("/profile", authenticate, asyncHandler(controller.profile));
router.patch("/profile", authenticate, asyncHandler(controller.updateProfile));
router.patch("/changepassword", authenticate, asyncHandler(controller.changePassword));
router.patch("/change-password", authenticate, asyncHandler(controller.changePassword));

router.get("/users", authenticate, authorize("Admin"), asyncHandler(controller.users));
router.delete("/users/:id", authenticate, authorize("Admin"), asyncHandler(controller.deleteUser));
router.patch("/users/:id/role", authenticate, authorize("Admin"), asyncHandler(controller.updateRole));

export default router;
