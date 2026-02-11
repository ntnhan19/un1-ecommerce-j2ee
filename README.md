# Hệ Thống E-commerce (Dự Án Nhóm)

![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-green)
![React](https://img.shields.io/badge/React-19.2-blue)
![License](https://img.shields.io/badge/license-MIT-blue)

> Hệ thống E-commerce được xây dựng với Spring Boot và React, hỗ trợ quản lý sản phẩm, đơn hàng và người dùng.

## 📖 Tài Liệu

- [Setup Guide](SETUP.md) - Hướng dẫn cài đặt chi tiết
- [Contributing Guide](CONTRIBUTING.md) - Quy trình đóng góp code
- [API Documentation](API.md) - Tài liệu API endpoints
- [Architecture](docs/ARCHITECTURE.md) - Kiến trúc hệ thống

## 🛠 Công Nghệ Sử Dụng
*   **Backend**: Spring Boot (Java)
*   **Frontend**: (Đang cập nhật - React/Vue/Angular)
*   **Database**: (Đang cập nhật - MySQL/PostgreSQL)

## 📂 Cấu Trúc Dự Án

Dự án được chia thành 2 phần chính:
*   `backend/`: Mã nguồn Spring Boot API.
*   `frontend/`: Mã nguồn giao diện người dùng.

### Cấu trúc Backend
Backend tuân theo kiến trúc phân lớp chuẩn:
*   `config`: Cấu hình hệ thống (Security, Swagger...).
*   `controller`: API Endpoints.
*   `service`: Logic nghiệp vụ.
*   `repository`: Tương tác cơ sở dữ liệu.
*   `entity`: Các thực thể dữ liệu.
*   `dto`: Đối tượng chuyển đổi dữ liệu.

---

## 👥 Vai trò & Trách nhiệm của Nhóm

### 🧑‍💼 Ngọc Hân (Leader) - Kiến trúc sư & Quản lý
*   **Trọng tâm chính**: Kiến trúc hệ thống, Chất lượng mã nguồn, DevOps, Các module cốt lõi.
*   **Trách nhiệm**:
    *   Thiết lập khung dự án ban đầu (GitHub repo, CI/CD pipelines).
    *   Cấu hình Bảo mật (JWT/OAuth2), kết nối Cơ sở dữ liệu, và tài liệu Swagger.
    *   Review Pull Requests (PRs) từ các thành viên khác để đảm bảo chất lượng.
    *   Xử lý các logic phức tạp hoặc các vấn đề "nghẽn cổ chai" (blockers).
    *   Phối hợp với Frontend (Bích Luận) để thống nhất các đặc tả API.

### 👩‍💻 Bích Luận (Frontend Lead) - Chuyên gia Giao diện
*   **Trọng tâm chính**: Kiến trúc Frontend, Triển khai UI/UX, Tích hợp API.
*   **Trách nhiệm**:
    *   Thiết lập cấu trúc dự án React/Vue/Angular.
    *   Thiết kế và triển khai các component dùng chung (Button, Input, layout wrappers).
    *   Tích hợp các API do backend cung cấp.
    *   Đảm bảo ứng dụng hiển thị tốt trên mọi thiết bị (responsive) và thân thiện với người dùng.

### 👨‍💻 Minh Đức (Backend Developer) - Người xây dựng Dữ liệu & API
*   **Trọng tâm chính**: Thiết kế Cơ sở dữ liệu, Triển khai API cốt lõi.
*   **Trách nhiệm**:
    *   Thiết kế Sơ đồ Cơ sở dữ liệu (ERD) dựa trên yêu cầu.
    *   Triển khai các CRUD API cho các thực thể chính (Sản phẩm, Người dùng, Đơn hàng).
    *   Tối ưu hóa các truy vấn cơ sở dữ liệu và đảm bảo tính toàn vẹn dữ liệu.
    *   Phối hợp với Frontend để đảm bảo API đáp ứng nhu cầu UI.

### 👩‍💻 Thúy Vy (Backend Developer) - Người đảm bảo Logic & Chất lượng
*   **Trọng tâm chính**: Logic nghiệp vụ, Kiểm thử (Testing), Tài liệu.
*   **Trách nhiệm**:
    *   Triển khai các logic nghiệp vụ phức tạp (ví dụ: Quy tắc xử lý đơn hàng, Thông báo Email).
    *   Viết Unit Tests (JUnit/Mockito) để đảm bảo độ tin cậy của mã nguồn.
    *   Viết tài liệu API (OpenAPI/Swagger annotations).
    *   Hỗ trợ sửa lỗi (bug fixing) và duy trì chất lượng mã nguồn.

---

## 🚀 Hướng dẫn Cài đặt & Chạy (Tạm thời)

1.  **Backend**:
    *   Di chuyển vào thư mục `backend`.
    *   Chạy `mvn spring-boot:run` (hoặc dùng IDE của bạn).
2.  **Frontend**:
    *   Di chuyển vào thư mục `frontend`.
    *   Chạy `npm install` và `npm start`.

---
*Tài liệu được cập nhật lần cuối: Tháng 02/2026*
