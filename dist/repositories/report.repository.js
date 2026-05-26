"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportRepository = void 0;
const typeorm_1 = require("typeorm");
const Report_1 = require("../entities/Report");
const base_repository_1 = require("./abstract/base.repository");
const reportRelations = {
    user: true,
    category: true,
    status: true,
    images: true,
};
class ReportRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(Report_1.Report);
    }
    findAllWithRelations() {
        return this.repository().find({ relations: reportRelations, order: { createdAt: "DESC" } });
    }
    findOneWithRelations(reportId) {
        return this.repository().findOne({ where: { reportId }, relations: reportRelations });
    }
    findByUser(userId) {
        return this.repository().find({ where: { userId }, relations: reportRelations, order: { createdAt: "DESC" } });
    }
    findByCategory(categoryId) {
        return this.repository().find({ where: { categoryId }, relations: reportRelations, order: { createdAt: "DESC" } });
    }
    findByStatus(statusId) {
        return this.repository().find({ where: { statusId }, relations: reportRelations, order: { createdAt: "DESC" } });
    }
    findByStatusName(statusName) {
        return this.repository()
            .createQueryBuilder("report")
            .leftJoinAndSelect("report.user", "user")
            .leftJoinAndSelect("report.category", "category")
            .leftJoinAndSelect("report.status", "status")
            .leftJoinAndSelect("report.images", "images")
            .where("status.status_name = :statusName", { statusName: statusName.toUpperCase() })
            .orderBy("report.created_at", "DESC")
            .getMany();
    }
    search(query) {
        return this.repository().find({
            where: [{ title: (0, typeorm_1.Like)(`%${query}%`) }, { description: (0, typeorm_1.Like)(`%${query}%`) }, { location: (0, typeorm_1.Like)(`%${query}%`) }],
            relations: reportRelations,
            order: { createdAt: "DESC" },
        });
    }
}
exports.ReportRepository = ReportRepository;
//# sourceMappingURL=report.repository.js.map