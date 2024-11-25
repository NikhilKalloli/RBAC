export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  USER = 'USER'
}

export interface User {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: number;
}

export interface JWTPayload {
  sub: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

export interface AuthResponse {
  token: string;
  user: Omit<User, 'password'>;
} 