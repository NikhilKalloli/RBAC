import { SignJWT, jwtVerify } from 'jose';
import { JWTPayload as CustomJWTPayload } from '../types';
import { Env } from '../types/env';

export async function createToken(payload: Omit<CustomJWTPayload, 'iat' | 'exp'>, env: Env) {
  const secret = new TextEncoder().encode(env.JWT_SECRET);
  
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);
}

export async function verifyToken(token: string, env: Env): Promise<CustomJWTPayload | null> {
  try {
    const secret = new TextEncoder().encode(env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    
    if (
      typeof payload.sub === 'string' &&
      typeof payload.email === 'string' &&
      typeof payload.role === 'string'
    ) {
      return {
        sub: payload.sub,
        email: payload.email,
        role: payload.role as CustomJWTPayload['role'],
        iat: payload.iat,
        exp: payload.exp
      };
    }
    return null;
  } catch (error) {
    return null;
  }
} 