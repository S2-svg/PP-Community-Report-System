export declare class DashboardService {
    reportSummary(): Promise<{
        totalReports: number;
        totalUsers: number;
        byStatus: {
            status: string;
            count: number;
        }[];
    }>;
    categorySummary(): Promise<any[]>;
}
//# sourceMappingURL=dashboard.service.d.ts.map