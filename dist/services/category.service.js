"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const base_service_1 = require("./abstract/base.service");
const category_repository_1 = require("../repositories/category.repository");
class CategoryService extends base_service_1.BaseService {
    constructor() {
        super(new category_repository_1.CategoryRepository());
    }
}
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map