# UN1 E-Commerce Backend

Đây là thư mục chứa mã nguồn Backend (Spring Boot 3 + Java 17) của dự án UN1 E-Commerce.

## 🛠 Yêu cầu hệ thống (Prerequisites)
- **Java 17** (JDK 17 trở lên)
- **MySQL Server 8.0+** (đang chạy ở cổng mặc định 3306)
- **VS Code** (kèm bộ extension Extension Pack for Java / Spring Boot Extension Pack) hoặc **IntelliJ IDEA**.
- **Maven** (nếu bạn muốn chạy bằng command line, nhưng dùng sẵn IDE để chạy sẽ tiện hơn).

## ⚙️ Hướng dẫn cài đặt lần đầu (Initial Setup)

### 1. Thiết lập Database (Cực kỳ quan trọng)
Dự án được cấu hình tự động tạo CSDL `un1_ecommerce_dev` khi khởi động. Tuy nhiên, mật khẩu MySQL cá nhân của bạn sẽ **không bao giờ được đẩy lên Git** để đảm bảo bảo mật.

Vì vậy, sau khi clone/pull code về, hãy làm theo các bước sau:
1. Vào thư mục `src/main/resources/`.
2. Copy file `application-dev.yml.example` và thiết lập tên file mới là **`application-dev.yml`**.
3. Mở file `application-dev.yml` vừa tạo, tìm đến dòng `password:` (ở mục datasource) và điền mật khẩu tài khoản `root` MySQL của máy bạn.

### 2. Chạy ứng dụng

**Cách 1: Sử dụng giao diện VS Code / IntelliJ (Khuyên dùng)**
- Trình duyệt tới file `src/main/java/com/un1/ecommerce/Un1EcommerceApplication.java`.
- Nhấn trực tiếp vào dòng chữ xanh **Run** / **Debug** ngay trên hàm `main()`.
- *(Hoặc có thể chạy qua Spring Boot Dashboard phía tay trái của VS Code).*

**Cách 2: Sử dụng Dòng lệnh (Terminal) nếu máy có sẵn Maven**
```sh
cd backend
mvn clean install -DskipTests
mvn spring-boot:run
```

## 📚 Tài liệu API (Swagger UI)
Sau khi ứng dụng khởi chạy thành công ở port `8080` (Terminal báo tắt lỗi), bạn mở trình duyệt và truy cập vào link dưới đây để xem/chạy thử danh sách toàn bộ API:

👉 **[http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)**

## 📁 Cấu trúc Thư mục Hệ thống
Để đảm bảo thống nhất cho toàn bộ đội phát triển, mọi file Java được chia theo Layered Architecture:

- `config`: Cấu hình hệ thống (Spring Security, CORS, Swagger).
- `controller`: Hứng Request (REST APIs) và định tuyến HTTP.
- `service`: Code logic nghiệp vụ chính yếu (Business Logic + Validate).
- `repository`: Truy xuất DB bằng Spring Data JPA.
- `entity`: Nơi lưu các Class Model phản chiếu (map) trực tiếp thành Table dưới Database.
- `dto`: Gọi tắt của Data Transfer Objects (Hứng/Trả dữ liệu Request, Response gọn nhẹ).
- `exception`: Xử lý mảng bắt lỗi toàn cục (Global Error Controller).
- `util`: Hàm tiện ích thủ công tự viết.
- `constant`: Chỗ lưu enum, các hằng số Fix cứng.
