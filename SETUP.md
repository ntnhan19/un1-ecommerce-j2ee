# 🚀 Hướng Dẫn Cài Đặt & Chạy Dự Án

## Yêu Cầu Hệ Thống

### Backend
- Java: JDK 17 hoặc cao hơn
- Maven: 3.8+
- Database: MySQL 8.0+ hoặc PostgreSQL 14+

### Frontend
- Node.js: v18+ (LTS recommended)
- npm: v9+ hoặc yarn: v1.22+

### IDE Đề Xuất
- Backend: IntelliJ IDEA / VS Code / Eclipse
- Frontend: VS Code / Antigravity

## Cài Đặt

### 1. Clone Repository
```bash
git clone <repository-url>
cd <project-name>
```

### 2. Cài Đặt Backend
```bash
cd backend

# Cài đặt dependencies
mvn clean install

# Copy file config mẫu
cp src/main/resources/application.properties.example src/main/resources/application.properties

# Chỉnh sửa database config trong application.properties
# spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce_db
# spring.datasource.username=your_username
# spring.datasource.password=your_password

# Chạy application
mvn spring-boot:run
```

Backend sẽ chạy tại: `http://localhost:8080`

### 3. Cài Đặt Frontend
```bash
cd frontend

# Cài đặt dependencies
npm install

# Copy file env mẫu
cp .env.example .env

# Chỉnh sửa API endpoint trong .env
# VITE_API_BASE_URL=http://localhost:8080/api

# Chạy development server
npm run dev
```

Frontend sẽ chạy tại: `http://localhost:5173`

## Tạo Database
```sql
CREATE DATABASE ecommerce_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Spring Boot sẽ tự động tạo tables nếu config `spring.jpa.hibernate.ddl-auto=update`

## Troubleshooting

### Lỗi Port Already in Use
```bash
# Backend (port 8080)
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:8080 | xargs kill -9

# Frontend (port 5173) - tương tự
```

### Lỗi Database Connection
- Kiểm tra MySQL/PostgreSQL đã chạy chưa
- Kiểm tra username/password trong application.properties
- Kiểm tra database đã tạo chưa

## Verify Installation

### Backend
- Swagger UI: `http://localhost:8080/swagger-ui.html`
- Health check: `http://localhost:8080/actuator/health`

### Frontend
- Open browser: `http://localhost:5173`

## 🐳 Docker Setup (Khuyên dùng cho Deployment)

Dự án đã được cấu hình sẵn Docker để chạy toàn bộ hệ thống (Backend, Frontend, Database) chỉ với vài lệnh.

### Yêu cầu
- Docker
- Docker Compose

### Cách chạy
1. **Build và chạy các container**:
    ```bash
    docker-compose up -d --build
    ```
    *Lệnh này sẽ tự động tải MySQL, build Backend (Maven), build Frontend (Node/Nginx) và chạy tất cả.*

2. **Truy cập**:
    - Frontend: `http://localhost` (Port 80)
    - Backend API: `http://localhost:8080`
    - Database: Port 3306

3. **Dừng hệ thống**:
    ```bash
    docker-compose down
    ```

### Lưu ý khi dùng Docker
- Cấu hình database trong `docker-compose.yml` đã được thiết lập sẵn.
- Frontend sẽ được phục vụ bởi **Nginx**, tối ưu cho môi trường Production.
