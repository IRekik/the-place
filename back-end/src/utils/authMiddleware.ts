import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = String(process.env.SECRET_KEY) || "undefined";

const authenticateToken = (req: Request, res: Response, next: NextFunction): Response | void => {
    const tokenHeader = req.header('Authorization');
    if (!tokenHeader) {
        return res.status(401).json({ error: 'Unauthorized - Missing token' });
    }
    const [, rawToken] = tokenHeader.split(' ');
    const token = String(rawToken);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            console.log(token);
            console.log(SECRET_KEY);
            console.log(err);
            if (err.name === 'TokenExpiredError') {
                return res.status(403).json({ error: 'Forbidden - Token Expired' });
            } else {
                return res.status(403).json({ error: 'Forbidden - Invalid Token' });
            }        
        }
        req.user = user;
        next();
    });
};

export default authenticateToken;