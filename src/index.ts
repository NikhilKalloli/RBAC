import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { zValidator } from '@hono/zod-validator'
import { registerSchema, loginSchema } from './schemas/auth'
import { authMiddleware, rbacMiddleware } from './middleware/auth'
import { createToken } from './utils/jwt'
import { UserRole, JWTPayload } from './types'
import { UserService } from './services/userService'
import { hashPassword, verifyPassword } from './utils/password'
import { Env } from './types/env'

// Define the Hono app with proper types
type Variables = {
  user: JWTPayload;
};

const app = new Hono<{ Bindings: Env; Variables: Variables }>()

app.use('/*', cors({
  origin: ['http://localhost:5173', 'http://localhost:4173', 'https://your-frontend-domain.pages.dev'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length', 'X-Requested-With'],
  maxAge: 86400,
  credentials: true
}))

// Public routes
app.post('/auth/register', zValidator('json', registerSchema), async (c) => {
  const { email, password, role } = await c.req.json()
  const userService = new UserService(c.env)

  // Check if user exists
  const existingUser = await userService.getUserByEmail(email)
  if (existingUser) {
    return c.json({ error: 'User already exists' }, 400)
  }

  // Create new user
  const hashedPassword = await hashPassword(password)
  const user = await userService.createUser(email, hashedPassword, role || UserRole.USER)

  const token = await createToken({ 
    sub: user.id, 
    email: user.email, 
    role: user.role 
  }, c.env)
  
  return c.json({ 
    message: 'User registered successfully',
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    }
  })
})

app.post('/auth/login', zValidator('json', loginSchema), async (c) => {
  const { email, password } = await c.req.json()
  const userService = new UserService(c.env)
  
  const user = await userService.getUserByEmail(email)
  if (!user) {
    return c.json({ error: 'Invalid credentials' }, 401)
  }

  const isValidPassword = await verifyPassword(password, user.password)
  if (!isValidPassword) {
    return c.json({ error: 'Invalid credentials' }, 401)
  }
  
  const token = await createToken({ 
    sub: user.id, 
    email: user.email, 
    role: user.role 
  }, c.env)
  
  return c.json({ 
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    }
  })
})

// Protected routes
app.use('/api/*', authMiddleware)

app.get('/api/user/profile', async (c) => {
  const user = c.get('user') as JWTPayload
  return c.json({ user })
})

// Admin only routes
app.get('/api/admin', rbacMiddleware([UserRole.ADMIN, UserRole.SUPER_ADMIN]), 
  async (c) => {
    return c.json({ message: 'Admin access granted' })
})

app.post('/auth/logout', authMiddleware, async (c) => {
  const authHeader = c.req.header('Authorization');
  const token = authHeader?.split(' ')[1] || '';
  
  const userService = new UserService(c.env);
  await userService.blacklistToken(token);
  
  return c.json({ message: 'Logged out successfully' });
});

export default app