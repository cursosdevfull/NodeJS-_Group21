import { NextFunction, Request, Response } from "express";

export const TimingMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const start = process.hrtime();

    res.on('finish', () => {
        const duration = process.hrtime(start);
        const milliseconds = (duration[0] * 1e9 + duration[1]) / 1e6; // Convert to milliseconds
        console.log(`Request to ${req.method} ${req.originalUrl} took ${milliseconds.toFixed(2)} ms`);
    });

    next();
}