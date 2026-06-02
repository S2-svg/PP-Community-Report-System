import { Report } from "../entities/Report";
import { ReportStatusHistory } from "../entities/ReportStatusHistory";
import { CreateReportInput, UpdateReportInput, UpdateReportStatusInput } from "../interfaces/report.interface";
export declare class ReportService {
    private readonly reports;
    private readonly statusHistory;
    findAll(): Promise<Report[]>;
    findById(reportId: number): Promise<Report>;
    create(input: CreateReportInput): Promise<Report>;
    update(reportId: number, input: UpdateReportInput): Promise<Report>;
    updateStatus(reportId: number, input: UpdateReportStatusInput): Promise<Report>;
    findStatusHistory(reportId: number): Promise<ReportStatusHistory[]>;
    delete(reportId: number): Promise<Report>;
    findByUser(userId: number): Promise<Report[]>;
    findByCategory(categoryId: number): Promise<Report[]>;
    findByStatus(status: string): Promise<Report[]>;
    search(query: string): Promise<Report[]>;
}
//# sourceMappingURL=report.service.d.ts.map