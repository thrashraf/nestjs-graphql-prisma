import jwt from "jsonwebtoken";

export function signJwt(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { algorithm: 'RS256' });
}

export function decodeJwt(token: string) {
    
    if (!token) return null;

    try {
        return jwt.verify(token, process.env.JWT_PUBLIC_KEY);
    } catch (error) {
        console.log(`error: ${error}`);
        return null;
    }
}