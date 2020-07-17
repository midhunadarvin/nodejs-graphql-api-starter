import { Request, Response, NextFunction } from 'express';

export default function auth(req: Request, res: Response, next: NextFunction): void {
    // TODO: Validate authentication token
    // req.user = { username: 'midhun', isAdmin: true };
    next();
}
