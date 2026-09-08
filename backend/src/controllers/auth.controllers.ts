import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {env} from '../config/env';
import {users} from '../data/users';
import {JwtPayload} from '../types';


export function login (req: Request, res: Response): Response | void {

    const {username,password} = req.body;

    if (!username || !password) {
        return res.status(400).json({error: 'Username y password son requeridos'});
    }

    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({error: 'Credenciales invalidas'});
    }

    const payload: JwtPayload = user.role === 'user'
    ? {sub: user.id, role: user.role, rut: user.rut}
    : {sub: user.id, role: user.role};

    const token = jwt.sign(payload, env.jwtSecret, {expiresIn: env.jwtExpiresInSeconds});

    return res.json({token});

}