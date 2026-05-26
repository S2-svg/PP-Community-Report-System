"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepository = void 0;
const Category_1 = require("../entities/Category");
const base_repository_1 = require("./abstract/base.repository");
class CategoryRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(Category_1.Category);
    }
}
exports.CategoryRepository = CategoryRepository;
//# sourceMappingURL=category.repository.js.map