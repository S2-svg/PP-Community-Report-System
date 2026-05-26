import { Response } from "express";
export declare const sendSuccess: <T>(res: Response, statusCode: number, message: string, data?: T) => Response<any, Record<string, any>>;
export declare const sendError: (res: Response, statusCode: number, message: string) => Response<any, Record<string, any>>;
//# sourceMappingURL=responseHandler.d.ts.map