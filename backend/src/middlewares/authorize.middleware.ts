import {Request, Response, NextFunction} from 'express';
import {sameRut} from '../utils/rut.utils';

export function authorizeScoreAccess(req: Request, res: Response, next: NextFunction): Response | void {


    if (!req.params.rut) {
        return res.status(400).json({error: 'RUT no proporcionado'});
    }

    const rut = req.params.rut;

    if (!req.user){
        return res.status(401).json({error: 'Autorizacion denegada'});
    }

    if (req.user.role === 'admin') {
        return next();
    }

    if (req.user.rut && sameRut(req.user.rut, rut)) {
        return next();
    }

    return res.status(403).json({error: 'No tienes permiso para consultar el puntaje de este RUT'});
}