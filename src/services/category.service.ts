import { Category } from "../entities/Category";
import { BaseService } from "../abstract/base.service";
import { CategoryRepository } from "../repositories/category.repository";

export class CategoryService extends BaseService<Category> {
  constructor() {
    super(new CategoryRepository());
  }
}
