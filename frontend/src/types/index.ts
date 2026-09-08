export type Role = 'admin' | 'user' ;

export interface AuthUser {
    sub: string;
    role: Role;
    rut?: string;
}

export interface ScoreResult {
    rut: string;
    score: number;
    fecha: string;
}