import {Request, Response} from 'express';
import {calculateScore} from '../utils/score.utils';


export function getScore(req: Request, res: Response): Response | void {

    if (!req.params.rut) {
        return res.status(400).json({error: 'RUT no proporcionado'});
    }

    const rut = req.params.rut;

    const score = calculateScore(rut);      

    return res.json ({

        rut,
        score,
        fecha: new Date().toISOString()
    });
}