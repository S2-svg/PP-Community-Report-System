import { Like } from "typeorm";
import { Report } from "../entities/Report";
import { BaseRepository } from "./abstract/base.repository";

const reportRelations = {
  user: true,
  category: true,
  status: true,
  images: true,
};

export class ReportRepository extends BaseRepository<Report> {
  constructor() {
    super(Report);
  }

  findAllWithRelations() {
    return this.repository().find({ relations: reportRelations, order: { createdAt: "DESC" } });
  }

  findOneWithRelations(reportId: number) {
    return this.repository().findOne({ where: { reportId }, relations: reportRelations });
  }

  findByUser(userId: number) {
    return this.repository().find({ where: { userId }, relations: reportRelations, order: { createdAt: "DESC" } });
  }

  findByCategory(categoryId: number) {
    return this.repository().find({ where: { categoryId }, relations: reportRelations, order: { createdAt: "DESC" } });
  }

  findByStatus(statusId: number) {
    return this.repository().find({ where: { statusId }, relations: reportRelations, order: { createdAt: "DESC" } });
  }

  findByStatusName(statusName: string) {
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

  search(query: string) {
    return this.repository().find({
      where: [{ title: Like(`%${query}%`) }, { description: Like(`%${query}%`) }, { location: Like(`%${query}%`) }],
      relations: reportRelations,
      order: { createdAt: "DESC" },
    });
  }
}
