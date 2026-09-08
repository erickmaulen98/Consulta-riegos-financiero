import {api} from './api';
import type {ScoreResult} from '../types';

export async function getScore(rut: string): Promise<ScoreResult> {
    const data = await api.get(`/score/${encodeURIComponent(rut)}`);
    return data.data;
}