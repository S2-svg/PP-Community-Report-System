import { Category } from "../entities/Category";
import { BaseRepository } from "./abstract/base.repository";

export class CategoryRepository extends BaseRepository<Category> {
  constructor() {
    super(Category);
  }
}
