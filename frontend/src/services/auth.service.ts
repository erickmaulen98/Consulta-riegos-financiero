import {api} from './api';

export async function login(username: string, password: string): Promise<{ token: string }> {

    const data = await api.post('/login', {username, password});
    return data.data;
}