import { Request, Response } from "express";
export declare class CategoryController {
    create: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    findAll: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    findById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    update: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    delete: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=category.controller.d.ts.map