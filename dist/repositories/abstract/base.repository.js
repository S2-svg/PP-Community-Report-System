"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const data_source_1 = require("../../config/data-source");
class BaseRepository {
    constructor(entity) {
        this.entity = entity;
    }
    repository() {
        return data_source_1.AppDataSource.getRepository(this.entity);
    }
    findAll(options) {
        return this.repository().find(options);
    }
    findById(where) {
        return this.repository().findOne({ where });
    }
    create(data) {
        return this.repository().save(this.repository().create(data));
    }
    async update(where, data) {
        const item = await this.findById(where);
        if (!item) {
            return null;
        }
        return this.repository().save(Object.assign(item, data));
    }
    async delete(where) {
        const item = await this.findById(where);
        if (!item) {
            return null;
        }
        await this.repository().delete(where);
        return item;
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base.repository.js.map