"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const category_service_1 = require("../services/category.service");
const responseHandler_1 = require("../utils/responseHandler");
const service = new category_service_1.CategoryService();
class CategoryController {
    constructor() {
        this.create = async (req, res) => {
            const category = await service.create(req.body);
            return (0, responseHandler_1.sendSuccess)(res, 201, "Category created successfully", category);
        };
        this.findAll = async (_req, res) => {
            const categories = await service.findAll({ order: { categoryId: "ASC" } });
            return (0, responseHandler_1.sendSuccess)(res, 200, "Categories retrieved successfully", categories);
        };
        this.findById = async (req, res) => {
            const category = await service.findById({ categoryId: Number(req.params.id) }, "Category not found");
            return (0, responseHandler_1.sendSuccess)(res, 200, "Category retrieved successfully", category);
        };
        this.update = async (req, res) => {
            const category = await service.update({ categoryId: Number(req.params.id) }, req.body, "Category not found");
            return (0, responseHandler_1.sendSuccess)(res, 200, "Category updated successfully", category);
        };
        this.delete = async (req, res) => {
            const category = await service.delete({ categoryId: Number(req.params.id) }, "Category not found");
            return (0, responseHandler_1.sendSuccess)(res, 200, "Category deleted successfully", category);
        };
    }
}
exports.CategoryController = CategoryController;
//# sourceMappingURL=category.controller.js.map