import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { asyncHandler } from "../middlewares/error.middleware";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";

const router = Router();
const controller = new UserController();

router.get("/profile", authenticate, asyncHandler(controller.profile));
router.patch("/profile", authenticate, asyncHandler(controller.updateProfile));

router.get("/users", authenticate, authorize("Admin"), asyncHandler(controller.users));
router.delete("/users/:id", authenticate, authorize("Admin"), asyncHandler(controller.deleteUser));
router.patch("/users/:id/role", authenticate, authorize("Admin"), asyncHandler(controller.updateRole));

export default router;
