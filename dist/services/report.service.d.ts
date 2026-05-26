import { CreateReportInput, UpdateReportInput, UpdateReportStatusInput } from "../interfaces/report.interface";
export declare class ReportService {
    private readonly reports;
    findAll(): Promise<import("../entities/Report").Report[]>;
    findById(reportId: number): Promise<import("../entities/Report").Report>;
    create(input: CreateReportInput): Promise<import("../entities/Report").Report>;
    update(reportId: number, input: UpdateReportInput): Promise<import("../entities/Report").Report>;
    updateStatus(reportId: number, input: UpdateReportStatusInput): Promise<import("../entities/Report").Report>;
    delete(reportId: number): Promise<import("../entities/Report").Report>;
    findByUser(userId: number): Promise<import("../entities/Report").Report[]>;
    findByCategory(categoryId: number): Promise<import("../entities/Report").Report[]>;
    findByStatus(status: string): Promise<import("../entities/Report").Report[]>;
    search(query: string): Promise<import("../entities/Report").Report[]>;
}
//# sourceMappingURL=report.service.d.ts.map