import type {AuthUser} from '../types/index';

export function decodeToken(token: string): AuthUser | null {

    const payload = token.split('.')[1];
    if (!payload) {
        return null;
    }

    try {
        const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
        const decodedPayload = atob(base64);
        const authUser: AuthUser = JSON.parse(decodedPayload);

        return authUser;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }

}