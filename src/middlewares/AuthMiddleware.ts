import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['authorization']
        if (!token) return res.status(403).json({ message: 'no estas authorization' })
        jwt.verify(token, config.JWT_SECRET as string);
        next();
    } catch (error) {
        return res.status(400).json({ message: 'Token inválido' });
    }
}

export default authMiddleware;