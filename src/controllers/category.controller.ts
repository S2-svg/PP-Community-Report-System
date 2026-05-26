import { Request, Response } from "express";
import { CategoryService } from "../services/category.service";
import { sendSuccess } from "../utils/responseHandler";

const service = new CategoryService();

export class CategoryController {
  create = async (req: Request, res: Response) => {
    const category = await service.create(req.body);
    return sendSuccess(res, 201, "Category created successfully", category);
  };

  findAll = async (_req: Request, res: Response) => {
    const categories = await service.findAll({ order: { categoryId: "ASC" } });
    return sendSuccess(res, 200, "Categories retrieved successfully", categories);
  };

  findById = async (req: Request, res: Response) => {
    const category = await service.findById({ categoryId: Number(req.params.id) }, "Category not found");
    return sendSuccess(res, 200, "Category retrieved successfully", category);
  };

  update = async (req: Request, res: Response) => {
    const category = await service.update({ categoryId: Number(req.params.id) }, req.body, "Category not found");
    return sendSuccess(res, 200, "Category updated successfully", category);
  };

  delete = async (req: Request, res: Response) => {
    const category = await service.delete({ categoryId: Number(req.params.id) }, "Category not found");
    return sendSuccess(res, 200, "Category deleted successfully", category);
  };
}
