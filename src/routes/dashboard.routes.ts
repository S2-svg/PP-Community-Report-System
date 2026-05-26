import { Router } from "express";
import { DashboardController } from "../controllers/dashboard.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { asyncHandler } from "../middlewares/error.middleware";
import { authorize } from "../middlewares/role.middleware";

const router = Router();
const controller = new DashboardController();

router.get("/report-summary", authenticate, authorize("Admin"), asyncHandler(controller.reportSummary));
router.get("/category-summary", authenticate, authorize("Admin"), asyncHandler(controller.categorySummary));

export default router;
