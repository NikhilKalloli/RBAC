# RBAC (Role-Based Access Control) System

## Introduction
This project implements a comprehensive Role-Based Access Control (RBAC) system with a modern React-based frontend and a secure backend infrastructure. The system demonstrates advanced authentication and authorization mechanisms while maintaining a user-friendly interface.

## Technical Stack

### Frontend:
- React with TypeScript
- Chakra UI for component styling
- Framer Motion for animations
- React Router for navigation
- Axios for API communication

### Backend:
- Cloudflare Workers
- JWT for secure authentication
- RESTful API architecture

---

## Security Implementation

### 1. Authentication System
- Secure user registration with email and password
- JWT-based authentication system
- Protected route middleware
- Secure session management
- Axios interceptors for automatic token handling
- Logout functionality with token invalidation

### 2. Authorization & RBAC
Implemented three distinct user roles:
- **ADMIN**: Full system access
- **MODERATOR**: Limited administrative capabilities
- **USER**: Basic access rights

Role-specific features:
- Protected routes based on user roles
- Component-level access control
- Role-based UI adaptation
- Hierarchical permission structure

### 3. Security Best Practices
- Password hashing for secure storage
- JWT token-based authentication
- Protected API endpoints
- CORS protection
- Request/Response interceptors
- Error handling and logging
- Secure HTTP-only cookies
- XSS protection through React's built-in mechanisms

---

## Key Features

### 1. User Management
- User registration with role selection
- Secure login/logout
- Profile management
- Role-based dashboard access

### 2. Access Control
- Route protection based on roles
- Dynamic UI rendering based on permissions
- Protected API endpoints
- Role-specific features

---

## Screenshots:
![Screenshot 2024-11-27 185614](https://github.com/user-attachments/assets/53b2f57d-cde8-49bb-966e-714bc4b70013)
![Screenshot 2024-11-27 191001](https://github.com/user-attachments/assets/4b949773-d9f6-4009-b358-fce91bdfe13b)




## API Endpoints & Data Flow

### 1. Authentication Endpoints
- **POST /auth/register**: User registration
  - Validates email and password
  - Hashes password using bcrypt
  - Stores user data in KV store
  - Returns JWT token

- **POST /auth/login**: User authentication
  - Validates credentials
  - Returns JWT token with user role
  - Sets session data

- **POST /auth/logout**: Session termination
  - Invalidates current token
  - Clears session data

### 2. Protected Endpoints
- **GET /api/user/profile**: User profile data
  - Requires valid JWT
  - Returns user-specific information

- **GET /api/admin**: Admin-only data
  - Requires ADMIN role
  - Returns administrative information

- **GET /api/moderator**: Moderator access
  - Requires MODERATOR role
  - Returns moderation tools

---

## Data Storage (Cloudflare KV)

### 1. User Data Structure
```json
{
  "userId": "unique-uuid",
  "email": "user@example.com",
  "passwordHash": "bcrypt-hashed-password",
  "role": "USER|ADMIN|MODERATOR",
  "createdAt": "timestamp",
  "lastLogin": "timestamp"
}
```

# System Architecture Documentation

## KV Store Organization
- **Users:{userId}**: Stores user profile data
- **Sessions:{sessionId}**: Manages active sessions
- **Roles:{roleId}**: Stores role permissions
- **Tokens:{token}**: Tracks valid JWT tokens

## Data Operations
- **Create**: Atomic operations for new user registration
- **Read**: Fast key-value lookups for authentication
- **Update**: Atomic updates for profile changes
- **Delete**: Immediate invalidation for logouts


## Code Organization
The project follows a modular architecture:

### Components
- Reusable UI components
- Protected route wrapper
- Layout components

### Context
- Authentication context for global state
- User role management

### Services
- API service layer
- Authentication service
- Role-based service segregation

### Types
- TypeScript interfaces
- Role enums
- Shared types

### Pages
- Role-specific pages
- Public pages
- Protected dashboards

## Testing & Security Validation
The system can be tested using the following credentials:

### Admin Access
- Email: admin@example.com
- Password: password123

### Regular User
- Email: user@example.com
- Password: password123
