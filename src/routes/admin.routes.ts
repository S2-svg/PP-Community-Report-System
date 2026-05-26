import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { ReportController } from "../controllers/report.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { asyncHandler } from "../middlewares/error.middleware";
import { authorize } from "../middlewares/role.middleware";

const router = Router();
const authController = new AuthController();
const reportController = new ReportController();

router.use(authenticate, authorize("Admin"));

router.get("/users", asyncHandler(authController.users));
router.delete("/users/:id", asyncHandler(authController.deleteUser));
router.patch("/users/:id/role", asyncHandler(authController.updateRole));
router.get("/reports", asyncHandler(reportController.findAll));

export default router;
