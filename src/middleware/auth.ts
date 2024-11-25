import { Context, Next } from 'hono';
import { verifyToken } from '../utils/jwt';
import { UserRole } from '../types';
import { Env } from '../types/env';

export async function authMiddleware(c: Context<{ Bindings: Env }>, next: Next) {
  const authHeader = c.req.header('Authorization');
  
  if (!authHeader?.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const token = authHeader.split(' ')[1];
  const payload = await verifyToken(token, c.env);

  if (!payload) {
    return c.json({ error: 'Invalid token' }, 401);
  }
  // @ts-ignore 
  c.set('user', payload);
  await next();
}

export function rbacMiddleware(allowedRoles: UserRole[]) {
  return async function(c: Context<{ Bindings: Env }>, next: Next) {
    // @ts-ignore
    const user = c.get('user');
    // @ts-ignore
    if (!user || !allowedRoles.includes(user.role)) {
      return c.json({ error: 'Forbidden' }, 403);
    }
    
    await next();
  };
} 