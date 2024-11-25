import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { zValidator } from '@hono/zod-validator'
import { registerSchema, loginSchema } from './schemas/auth'
import { authMiddleware, rbacMiddleware } from './middleware/auth'
import { createToken } from './utils/jwt'
import { UserRole } from './types'

const app = new Hono()

app.use('/*', cors())

// Public routes
app.post('/auth/register', zValidator('json', registerSchema), async (c) => {
  const { email, password, role } = await c.req.json()
  const token = await createToken({ sub: 'user-id', email, role })
  
  return c.json({ 
    message: 'User registered successfully',
    token 
  })
})

app.post('/auth/login', zValidator('json', loginSchema), async (c) => {
  const { email, password } = await c.req.json()
  
  
  const token = await createToken({ 
    sub: 'user-id', 
    email, 
    role: UserRole.USER 
  })
  
  return c.json({ token })
})

// Protected routes
app.use('/api/*', authMiddleware)

app.get('/api/user/profile', async (c) => {
  const user = c.get('user')
  return c.json({ user })
})

// Admin only routes
app.get('/api/admin', rbacMiddleware([UserRole.ADMIN, UserRole.SUPER_ADMIN]), 
  async (c) => {
    return c.json({ message: 'Admin access granted' })
})

export default app