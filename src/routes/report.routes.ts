import { Router } from "express";
import { ReportController } from "../controllers/report.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { asyncHandler } from "../middlewares/error.middleware";
import { authorize } from "../middlewares/role.middleware";
import { upload } from "../middlewares/upload.middleware";

const router = Router();
const controller = new ReportController();

router.get("/", authenticate, asyncHandler(controller.findAll));
router.get("/search", authenticate, asyncHandler(controller.search));
router.get("/user/:userId", authenticate, asyncHandler(controller.findByUser));
router.get("/users/:userId", authenticate, asyncHandler(controller.findByUser));
router.get("/category/:categoryId", authenticate, asyncHandler(controller.findByCategory));
router.get("/categories/:categoryId", authenticate, asyncHandler(controller.findByCategory));
router.get("/status/:status", authenticate, asyncHandler(controller.findByStatus));
router.get("/statuses/:status", authenticate, asyncHandler(controller.findByStatus));
router.get("/:id", authenticate, asyncHandler(controller.findById));

router.post("/", authenticate, upload.array("images", 5), asyncHandler(controller.create));
router.put("/:id", authenticate, asyncHandler(controller.update));
router.patch("/:id/status", authenticate, authorize("Admin"), asyncHandler(controller.updateStatus));
router.delete("/:id", authenticate, asyncHandler(controller.delete));

export default router;
