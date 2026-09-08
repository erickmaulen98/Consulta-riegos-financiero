import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import {env} from '../config/env';
import {JwtPayload} from '../types';

export function authenticate(req: Request, res: Response, next: NextFunction): Response | void {
    const header = req.headers.authorization;

    if (!header || !header.startsWith('Bearer')) {
        return res.status(401).json({error: 'Autorizacion denegada'});
    }

    const token = header.slice(7);

    try {
        const payload = jwt.verify(token,env.jwtSecret) as JwtPayload;
        req.user = payload;
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({error: 'Sesion expirada, valida token'});
        }
        return res.status(401).json({error: 'Token invalido'});
    }
}


