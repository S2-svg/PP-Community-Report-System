export interface CreateReportInput {
    userId: number;
    categoryId: number;
    title: string;
    description: string;
    location: string;
    imageUrls?: string[];
}
export interface UpdateReportInput {
    categoryId?: number;
    title?: string;
    description?: string;
    location?: string;
}
export interface UpdateReportStatusInput {
    statusId: number;
}
//# sourceMappingURL=report.interface.d.ts.map