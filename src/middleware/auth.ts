import { Context, Next } from 'hono';
import { verifyToken } from '../utils/jwt';
import { UserRole } from '../types';

export async function authMiddleware(c: Context, next: Next) {
  const authHeader = c.req.header('Authorization');
  
  if (!authHeader?.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const token = authHeader.split(' ')[1];
  const payload = await verifyToken(token);

  if (!payload) {
    return c.json({ error: 'Invalid token' }, 401);
  }

  c.set('user', payload);
  await next();
}

export function rbacMiddleware(allowedRoles: UserRole[]) {
  return async function(c: Context, next: Next) {
    const user = c.get('user');
    
    if (!user || !allowedRoles.includes(user.role)) {
      return c.json({ error: 'Forbidden' }, 403);
    }
    
    await next();
  };
} 