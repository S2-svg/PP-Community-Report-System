import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { asyncHandler } from "../middlewares/error.middleware";
import { authorize } from "../middlewares/role.middleware";

const router = Router();
const controller = new CategoryController();

router.get("/", asyncHandler(controller.findAll));
router.get("/:id", asyncHandler(controller.findById));
router.post("/", authenticate, authorize("Admin"), asyncHandler(controller.create));
router.put("/:id", authenticate, authorize("Admin"), asyncHandler(controller.update));
router.delete("/:id", authenticate, authorize("Admin"), asyncHandler(controller.delete));

export default router;
