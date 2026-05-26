import { Router } from "express";
import { NotificationController } from "../controllers/notification.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { asyncHandler } from "../middlewares/error.middleware";

const router = Router();
const controller = new NotificationController();

router.get("/", authenticate, asyncHandler(controller.findAll));

export default router;
