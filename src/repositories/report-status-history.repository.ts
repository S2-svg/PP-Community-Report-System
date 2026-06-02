import { BaseRepository } from "../abstract/base.repository";
import { ReportStatusHistory } from "../entities/ReportStatusHistory";

export class ReportStatusHistoryRepository extends BaseRepository<ReportStatusHistory> {
  constructor() {
    super(ReportStatusHistory);
  }

  findByReport(reportId: number) {
    return this.repository().find({
      where: { reportId },
      relations: {
        previousStatus: true,
        newStatus: true,
        changedBy: true,
      },
      order: { createdAt: "ASC" },
    });
  }
}
