"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const error_middleware_1 = require("../../middlewares/error.middleware");
class BaseService {
    constructor(repository) {
        this.repository = repository;
    }
    findAll(options) {
        return this.repository.findAll(options);
    }
    async findById(where, notFoundMessage = "Record not found") {
        const item = await this.repository.findById(where);
        if (!item) {
            throw new error_middleware_1.AppError(404, notFoundMessage);
        }
        return item;
    }
    create(data) {
        return this.repository.create(data);
    }
    async update(where, data, notFoundMessage = "Record not found") {
        await this.findById(where, notFoundMessage);
        return this.repository.update(where, data);
    }
    async delete(where, notFoundMessage = "Record not found") {
        const deleted = await this.repository.delete(where);
        if (!deleted) {
            throw new error_middleware_1.AppError(404, notFoundMessage);
        }
        return deleted;
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map