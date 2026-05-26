"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("../controllers/category.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const error_middleware_1 = require("../middlewares/error.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const router = (0, express_1.Router)();
const controller = new category_controller_1.CategoryController();
router.get("/", (0, error_middleware_1.asyncHandler)(controller.findAll));
router.get("/:id", (0, error_middleware_1.asyncHandler)(controller.findById));
router.post("/", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)("Admin"), (0, error_middleware_1.asyncHandler)(controller.create));
router.put("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)("Admin"), (0, error_middleware_1.asyncHandler)(controller.update));
router.delete("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)("Admin"), (0, error_middleware_1.asyncHandler)(controller.delete));
exports.default = router;
//# sourceMappingURL=category.routes.js.map