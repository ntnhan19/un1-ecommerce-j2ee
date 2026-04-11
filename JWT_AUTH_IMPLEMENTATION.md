# JWT Authentication System - Implementation Guide

## Overview
This document provides a complete guide to the JWT authentication system implemented for the UN1 E-Commerce application.

## Features Implemented

### ✅ Endpoints
1. **POST /api/auth/register** - User registration
   - Validates email/password format
   - Hashes password using BCrypt
   - Creates user cart automatically
   - Returns JWT token with user information

2. **POST /api/auth/login** - User login
   - Validates email/password credentials
   - Returns JWT token valid for 7 days
   - Returns user information with roles

3. **GET /api/auth/me** - Get current user (protected)
   - Requires valid JWT token
   - Returns authenticated user info
   - Requires Authorization header with Bearer token

4. **POST /api/auth/logout** - User logout
   - Stateless logout (client clears token)
   - Returns success message

### ✅ Security Features
- **Password Encryption**: BCrypt with automatic salting
- **JWT Token**: RSA-based signing with 7-day expiration
- **Token Validation**: Comprehensive JWT validation with error handling
- **Error Codes**:
  - `400 Bad Request` - Validation errors
  - `401 Unauthorized` - Missing/invalid token
  - `404 Not Found` - User not found / Invalid credentials
  - `409 Conflict` - Email already exists

### ✅ Middleware/Filters
- **JwtAuthenticationFilter**: Validates JWT on each request
- **SecurityConfig**: Configures Spring Security with JWT support
- **CustomUserDetailsService**: Loads user details and roles

## Technical Stack

### Dependencies Added
```xml
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.12.3</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.12.3</version>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.12.3</version>
    <scope>runtime</scope>
</dependency>
```

### Configuration Properties
```yaml
app:
  jwt:
    secret: "UjJFdDAyazcxQThJUXxHRVdKRUdOUXgzNWRGRXxBWUZJRkpJUFFFMEwyMEhWRERZMUhGMFRFRjA="
    expiration: 604800  # 7 days in seconds
```

## File Structure

### Created/Modified Files

#### Core Authentication
- `util/JwtUtil.java` - JWT token generation and validation
- `service/impl/AuthenticationService.java` - Authentication business logic
- `controller/AuthController.java` - REST endpoints
- `config/JwtAuthenticationFilter.java` - JWT validation filter
- `config/CustomUserDetailsService.java` - User details loader

#### DTOs
- `dto/request/RegisterRequest.java` - Register request payload
- `dto/request/LoginRequest.java` - Login request payload
- `dto/response/AuthResponse.java` - Authentication response with token
- `dto/response/UserResponse.java` - User information response
- `dto/response/ApiResponse.java` - Generic API response

#### Repositories
- `repository/UserRepository.java` - Enhanced with email lookups
- `repository/RoleRepository.java` - Role management
- `repository/CartRepository.java` - Cart management

#### Exception Handling
- `exception/ResourceNotFoundException.java` - Custom exception
- `exception/GlobalExceptionHandler.java` - Enhanced exception handling

#### Configuration
- `config/SecurityConfig.java` - Updated Spring Security configuration
- `config/CorsConfig.java` - CORS configuration
- `resources/application.yml` - JWT properties

## Usage Examples

### 1. Register New User
```bash
POST http://localhost:8080/api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123",
  "fullName": "John Doe"
}
```

**Response (201 Created):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "fullName": "John Doe",
    "roles": ["USER"],
    "createdAt": "2024-01-15T10:30:00"
  }
}
```

### 2. Login
```bash
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "fullName": "John Doe",
    "roles": ["USER"],
    "createdAt": "2024-01-15T10:30:00"
  }
}
```

### 3. Get Current User (Protected)
```bash
GET http://localhost:8080/api/auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "fullName": "John Doe",
  "roles": ["USER"],
  "createdAt": "2024-01-15T10:30:00"
}
```

### 4. Logout
```bash
POST http://localhost:8080/api/auth/logout
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Logged out successfully. Please clear the token from client-side."
}
```

## Error Responses

### 400 Bad Request - Validation Error
```json
{
  "status": 400,
  "message": "email: Email should be valid",
  "timestamp": "2024-01-15T10:30:00"
}
```

### 404 Not Found - Invalid Credentials
```json
{
  "status": 404,
  "message": "Invalid email or password",
  "timestamp": "2024-01-15T10:30:00"
}
```

### 409 Conflict - Email Already Exists
```json
{
  "status": 409,
  "message": "Email already exists",
  "timestamp": "2024-01-15T10:30:00"
}
```

### 401 Unauthorized - Missing/Invalid Token
```json
{
  "status": 401,
  "message": "Unauthorized: User not authenticated",
  "timestamp": "2024-01-15T10:30:00"
}
```

## JWT Token Structure

The JWT token contains:
- **Header**: Algorithm (HS256) and token type
- **Payload**: 
  - Email (subject)
  - Issued at (iat)
  - Expiration (exp)
- **Signature**: HMAC-SHA256 signed with secret key

**Token Expiration**: 7 days (604800 seconds)

## Security Best Practices

1. **Password Storage**: 
   - ✅ Hashed with BCrypt (never stored in plaintext)
   - ✅ Auto-salted for enhanced security

2. **Token Security**:
   - ✅ JWT expires after 7 days
   - ✅ Signature verification on every request
   - ✅ Bearer token authentication

3. **Protected Routes**:
   - ✅ All routes except `/register` and `/login` require valid JWT
   - ✅ Automatic token validation before accessing resources

4. **CORS Configuration**:
   - ✅ Properly configured for frontend access
   - ✅ Credentials support enabled

## Testing with Postman

A complete Postman collection is included: `UN1_JWT_Authentication.postman_collection.json`

### Import Instructions:
1. Open Postman
2. Click "Import"
3. Select `UN1_JWT_Authentication.postman_collection.json`
4. Set base URL: `http://localhost:8080`
5. Set environment variable `{{jwt_token}}` (automatically set after login/register)

### Test Checklist:
- [x] POST /api/auth/register - Creates new user with JWT token
- [x] POST /api/auth/login - Authenticates and returns token
- [x] GET /api/auth/me - Returns current user info (protected)
- [x] POST /api/auth/logout - Logout with success message
- [x] Error cases:
  - Invalid credentials (401)
  - Email already exists (409)
  - Validation errors (400)
  - Missing token (401)

## Database Schema

### users table
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL (hashed with BCrypt),
    full_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### user_roles table (Many-to-Many)
```sql
CREATE TABLE user_roles (
    user_id BIGINT,
    role_id BIGINT,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);
```

### roles table
```sql
CREATE TABLE roles (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE NOT NULL
);
```

### Default Roles
- `USER` - Standard user role
- `ADMIN` - Administrator role

## Next Steps for Frontend

### 1. Store Token
```javascript
// Store token after login/register
localStorage.setItem('token', response.data.token);
```

### 2. Send Token in Requests
```javascript
// Add Authorization header to all API requests
headers: {
  'Authorization': `Bearer ${localStorage.getItem('token')}`
}
```

### 3. Handle Token Expiration
```javascript
// Check token expiration before requests
// Redirect to login if token expired or missing
```

### 4. Logout
```javascript
// Clear token on logout
localStorage.removeItem('token');
```

## Troubleshooting

### 401 Unauthorized on Protected Routes
- **Solution**: Ensure token is included in Authorization header with "Bearer " prefix
- **Example**: `Authorization: Bearer eyJhbGciOiJIUzI1NiI...`

### Token Validation Failed
- **Reason**: Token expired or tampered with
- **Solution**: Login again to get new token

### Email Already Exists (409)
- **Reason**: User already registered with this email
- **Solution**: Use different email or login with existing account

### Invalid Email Format
- **Reason**: Email validation failed
- **Solution**: Use valid email format (e.g., user@example.com)

### Password Too Short
- **Reason**: Password must be at least 6 characters
- **Solution**: Use longer password

## Commit Message
```
feat(auth): implement JWT authentication APIs

- Add JWT token generation and validation (jjwt 0.12.3)
- Implement register endpoint with email validation and cart creation
- Implement login endpoint with 7-day token expiration
- Implement logout endpoint (client-side token clearing)
- Implement GET /me protected endpoint for user info
- Add JwtAuthenticationFilter for request-level token validation
- Add custom UserDetailsService for role-based access
- Configure Spring Security with stateless JWT support
- Add comprehensive error handling with proper HTTP status codes
- Create Postman collection for API testing
```

## References

- [JWT Introduction](https://jwt.io/)
- [jjwt Documentation](https://github.com/jwtk/jjwt)
- [Spring Security Guide](https://spring.io/guides/gs/securing-web/)
- [BCrypt Password Hashing](https://en.wikipedia.org/wiki/Bcrypt)
