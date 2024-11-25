import { User, UserRole } from '../types';
import { Env } from '../types/env';

export class UserService {
  constructor(private env: Env) {}

  async createUser(email: string, hashedPassword: string, role: UserRole): Promise<User> {
    const user: User = {
      id: crypto.randomUUID(),
      email,
      password: hashedPassword,
      role,
      createdAt: Date.now()
    };
    
    await this.env.MY_KV.put(`user:${email}`, JSON.stringify(user));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const userData = await this.env.MY_KV.get(`user:${email}`);
    return userData ? JSON.parse(userData) : null;
  }
} 