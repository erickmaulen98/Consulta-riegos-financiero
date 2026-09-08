import {formatRut} from './rut.utils';


export function calculateScore(rut: string): number {

    const formattedRut = formatRut(rut);
    let hash =5381;

    for (let i = 0; i < formattedRut.length; i++) {
        hash = (hash * 33) + formattedRut.charCodeAt(i);
        hash = hash >>> 0;
    }

    return hash % 101;
}