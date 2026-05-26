import { Report } from "../entities/Report";
import { BaseRepository } from "./abstract/base.repository";
export declare class ReportRepository extends BaseRepository<Report> {
    constructor();
    findAllWithRelations(): Promise<Report[]>;
    findOneWithRelations(reportId: number): Promise<Report | null>;
    findByUser(userId: number): Promise<Report[]>;
    findByCategory(categoryId: number): Promise<Report[]>;
    findByStatus(statusId: number): Promise<Report[]>;
    findByStatusName(statusName: string): Promise<Report[]>;
    search(query: string): Promise<Report[]>;
}
//# sourceMappingURL=report.repository.d.ts.map