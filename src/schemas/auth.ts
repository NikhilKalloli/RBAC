import { z } from 'zod';
import { UserRole } from '../types';

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.nativeEnum(UserRole).optional().default(UserRole.USER),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
}); 