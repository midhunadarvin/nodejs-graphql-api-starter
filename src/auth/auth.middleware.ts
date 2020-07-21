import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const whiteListedUrls = ['/auth/login'];

export default function auth(req: Request, res: Response, next: NextFunction): void {
    if (whiteListedUrls.includes(req.url)) {
        next();
    } else {
        try {
            if (req.headers.authorization) {
                const token = req.headers.authorization.split(' ')[1];
                const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET_KEY as jwt.Secret);
                if (decodedToken.username) {
                    req.user = { username: decodedToken.username, isAdmin: false };
                    next();
                } else {
                    throw 'Invalid user ID';
                };
            } else {
                res.status(401).json({ error: 'Unauthorized!' }).end();
            }
        } catch (error) {
            console.log(error);
            res.status(401).json({ error: 'Unauthorized!' }).end();
        }
    }
}
