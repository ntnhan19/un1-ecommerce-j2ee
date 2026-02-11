# Hướng dẫn Development Workflow (Git Flow)

Dự án tuân theo mô hình **Git Flow** cơ bản để đảm bảo sự ổn định và chuyên nghiệp.

## 🌳 Nhánh (Branch)

*   **`main`**: Nhánh sản phẩm (Production). **KHÔNG** commit trực tiếp vào đây. Chỉ nhận merge từ `develop` khi release.
*   **`develop`**: Nhánh phát triển chính (Development). Chứa mã nguồn mới nhất đang được phát triển.
*   **`feature/*`**: Nhánh tính năng. Được tách ra từ `develop` để làm từng task cụ thể.
    *   Ví dụ: `feature/login`, `feature/product-api`.

## 🔄 Quy trình làm việc (Workflow)

1.  **Bắt đầu task mới**:
    ```bash
    git checkout develop
    git pull origin develop
    git checkout -b feature/ten-tinh-nang
    ```

2.  **Làm việc và Commit**:
    ```bash
    git add .
    git commit -m "feat: mô tả tính năng"
    ```

3.  **Hoàn thành và Push**:
    ```bash
    git push origin feature/ten-tinh-nang
    ```

4.  **Merge Request (Pull Request)**:
    *   Tạo PR từ `feature/ten-tinh-nang` vào `develop` trên GitHub.
    *   Review code và Merge.

## 🚫 Quy tắc Quan trọng
*   Không bao giờ push thẳng lên `main`.
*   Luôn pull `develop` mới nhất về trước khi tạo nhánh feature.

## 🛡️ Cấu hình Bảo vệ Nhánh (GitHub Branch Protection)

Để thực thi quy trình này, Leader (Ngọc Hân) cần thiết lập **Branch Protection Rules** trên GitHub:

### 1. Bảo vệ nhánh `main` (Production)
*   **Require a pull request before merging**: Bắt buộc.
*   **Require approvals**: Tối thiểu 1 (hoặc 2) người review.
*   **Do not allow bypassing the above settings**: Chỉ Admin mới được quyền force merge nếu cần thiết.
*   **Lock branch**: (Tùy chọn) Để đóng băng release.

### 2. Bảo vệ nhánh `develop` (Integration)
*   **Require a pull request before merging**: Bắt buộc.
*   **Require status checks to pass before merging**: Nếu sau này có CI/CD (GitHub Actions), code phải pass test mới được merge.
*   **Require conversation resolution before merging**: Tất cả comment review phải được giải quyết.

### 📜 Quyền hạn (Permissions)
*   **Admin/Maintainer**: Có quyền Merge vào `main`/`develop`.
*   **Developer**: Chỉ được push vào nhánh `feature/*` và tạo Pull Request. Không được push thẳng vào `main` hay `develop`.
