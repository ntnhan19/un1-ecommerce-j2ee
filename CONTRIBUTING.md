# 🤝 Hướng Dẫn Đóng Góp (Contributing Guide)

Cảm ơn bạn đã tham gia dự án! Tài liệu này hướng dẫn quy trình làm việc chuyên nghiệp với Git và GitHub để đảm bảo dự án luôn ổn định và dễ bảo trì.

## 📋 Mục Lục
- [Quy Tắc Chung](#-quy-tắc-chung)
- [Cấu Trúc Nhánh (Branching Strategy)](#-cấu-trúc-nhánh-branching-strategy)
- [Quy Trình Làm Việc (Workflow)](#-quy-trình-làm-việc-workflow)
- [Commit Message Convention](#-commit-message-convention)
- [Pull Request Guidelines](#-pull-request-guidelines)
- [Code Review Process](#-code-review-process)
- [Coding Standards](#-coding-standards)
- [Xử Lý Conflict](#-xử-lý-conflict)
- [Checklist Trước Khi Submit PR](#-checklist-trước-khi-submit-pr)

---

## 🚫 Quy Tắc Chung

### ❌ KHÔNG BAO GIỜ:
- Push trực tiếp vào `main` hoặc `develop`
- Commit code chưa được test
- Commit file config có thông tin nhạy cảm (passwords, API keys)
- Merge PR của chính mình (trừ trường hợp khẩn cấp)
- Force push (`git push -f`) trên nhánh shared

### ✅ LUÔN LUÔN:
- Pull code mới nhất từ `develop` trước khi bắt đầu task mới
- Viết commit message rõ ràng và có ý nghĩa
- Test kỹ code trước khi tạo PR
- Review code của người khác một cách nghiêm túc
- Giữ PR nhỏ và tập trung vào một task cụ thể

---

## 🌳 Cấu Trúc Nhánh (Branching Strategy)

Dự án sử dụng **Git Flow** đơn giản hóa:

```
main (production)
  ↑
develop (integration)
  ↑
feature/* (tính năng mới)
bugfix/* (sửa lỗi)
hotfix/* (sửa lỗi khẩn cấp)
```

### Các Loại Nhánh

#### 1. `main` - Nhánh Production
- **Mục đích**: Chứa code ổn định, sẵn sàng deploy
- **Quy tắc**: 
  - KHÔNG commit trực tiếp
  - Chỉ merge từ `develop` khi release
  - Mỗi merge vào `main` = 1 version release
  - Phải có approval từ Leader

#### 2. `develop` - Nhánh Development
- **Mục đích**: Tích hợp tất cả tính năng đang phát triển
- **Quy tắc**:
  - KHÔNG commit trực tiếp
  - Chỉ nhận merge từ `feature/*`, `bugfix/*`
  - Code phải pass CI/CD tests
  - Cần review từ ít nhất 1 member khác

#### 3. `feature/*` - Nhánh Tính Năng
- **Mục đích**: Phát triển tính năng mới
- **Naming convention**: `feature/<tên-tính-năng>`
- **Ví dụ**:
  - `feature/user-authentication`
  - `feature/product-catalog`
  - `feature/shopping-cart`
  - `feature/payment-integration`
- **Quy tắc**:
  - Tách từ `develop`
  - Merge về `develop` khi hoàn thành
  - Xóa sau khi merge thành công

#### 4. `bugfix/*` - Nhánh Sửa Lỗi
- **Mục đích**: Sửa lỗi trong quá trình development
- **Naming convention**: `bugfix/<tên-lỗi>`
- **Ví dụ**:
  - `bugfix/fix-login-validation`
  - `bugfix/fix-null-pointer-cart`
- **Quy tắc**: Tương tự `feature/*`

#### 5. `hotfix/*` - Nhánh Sửa Lỗi Khẩn Cấp
- **Mục đích**: Sửa lỗi nghiêm trọng trên production
- **Naming convention**: `hotfix/<tên-lỗi-khẩn-cấp>`
- **Quy tắc**:
  - Tách từ `main`
  - Merge vào CẢ `main` VÀ `develop`
  - Chỉ dùng khi thực sự khẩn cấp

---

## 🔄 Quy Trình Làm Việc (Workflow)

### Bước 1: Chuẩn Bị
```bash
# Đảm bảo bạn ở nhánh develop
git checkout develop

# Pull code mới nhất
git pull origin develop

# Kiểm tra trạng thái
git status
```

### Bước 2: Tạo Nhánh Feature Mới
```bash
# Tạo và chuyển sang nhánh mới
git checkout -b feature/ten-tinh-nang

# Ví dụ cụ thể:
git checkout -b feature/user-registration
```

### Bước 3: Làm Việc & Commit

```bash
# Kiểm tra file thay đổi
git status

# Thêm file vào staging
git add .
# Hoặc thêm từng file cụ thể
git add src/main/java/com/ecommerce/controller/UserController.java

# Commit với message chuẩn
git commit -m "feat: add user registration endpoint"

# Tiếp tục làm việc và commit thường xuyên
git add .
git commit -m "feat: add email validation for registration"
```

**💡 Tips**: 
- Commit nhỏ và thường xuyên
- Mỗi commit nên giải quyết một vấn đề cụ thể
- Commit message phải rõ ràng

### Bước 4: Đồng Bộ Với Develop (Thường Xuyên)

```bash
# Về nhánh develop
git checkout develop

# Pull code mới nhất
git pull origin develop

# Về nhánh feature của bạn
git checkout feature/ten-tinh-nang

# Rebase hoặc merge develop vào feature
git rebase develop
# Hoặc (nếu chưa quen rebase):
git merge develop
```

**⚠️ Lưu ý**: Làm điều này mỗi ngày để tránh conflict lớn!

### Bước 5: Push Code Lên GitHub

```bash
# Push lần đầu
git push -u origin feature/ten-tinh-nang

# Những lần sau
git push
```

### Bước 6: Tạo Pull Request (PR)

1. Vào GitHub repository
2. Click nút **"New Pull Request"**
3. Chọn:
   - **Base**: `develop`
   - **Compare**: `feature/ten-tinh-nang`
4. Điền thông tin PR (xem mẫu bên dưới)
5. Assign **Reviewer** (thường là Leader - Ngọc Hân)
6. Add **Labels** nếu có (enhancement, bug, documentation...)
7. Click **"Create Pull Request"**

### Bước 7: Code Review & Merge

1. Chờ reviewer phản hồi
2. Sửa theo feedback (nếu có)
3. Push thêm commits để sửa
4. Sau khi được approve → Leader sẽ merge
5. Xóa nhánh feature sau khi merge

```bash
# Sau khi PR được merge, cleanup local
git checkout develop
git pull origin develop
git branch -d feature/ten-tinh-nang  # Xóa nhánh local
```

---

## 📝 Commit Message Convention

Sử dụng **Conventional Commits** để commit message nhất quán và dễ đọc.

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types (Bắt buộc)

| Type | Mô tả | Ví dụ |
|------|-------|-------|
| `feat` | Tính năng mới | `feat: add user login API` |
| `fix` | Sửa lỗi | `fix: resolve null pointer in cart` |
| `docs` | Thay đổi documentation | `docs: update README installation steps` |
| `style` | Format code (không ảnh hưởng logic) | `style: format UserService with prettier` |
| `refactor` | Tái cấu trúc code | `refactor: extract validation to separate class` |
| `test` | Thêm/sửa tests | `test: add unit tests for ProductService` |
| `chore` | Tasks khác (build, dependencies) | `chore: update Spring Boot to 3.2.0` |
| `perf` | Cải thiện performance | `perf: optimize database query for products` |

### Scope (Tùy chọn)
Phần của project bị ảnh hưởng: `auth`, `product`, `cart`, `order`, `payment`...

### Subject (Bắt buộc)
- Viết ở dạng mệnh lệnh: "add", "fix", "update" (KHÔNG dùng "added", "fixed")
- Không viết hoa chữ cái đầu
- Không dấu chấm cuối câu
- Tối đa 50 ký tự
- Viết bằng tiếng Anh

### Ví Dụ Tốt ✅

```bash
git commit -m "feat: add user registration endpoint"

git commit -m "fix: resolve email validation error in signup"

git commit -m "docs: add API documentation for product endpoints"

git commit -m "refactor(auth): extract JWT token generation to util class"

git commit -m "test: add integration tests for order service"

git commit -m "chore: update dependencies to latest versions"
```

### Ví Dụ Không Tốt ❌

```bash
git commit -m "update"  # Quá chung chung

git commit -m "Fixed bugs"  # Không rõ bug gì, dùng past tense

git commit -m "Add User Registration API And Email Validation"  # Viết hoa, quá dài

git commit -m "WIP"  # Work In Progress - không nên push

git commit -m "fix bug."  # Có dấu chấm, không cụ thể
```

### Commit Message Với Body (Cho thay đổi phức tạp)

```bash
git commit -m "feat(payment): integrate VNPay payment gateway

- Add VNPay API configuration
- Implement payment callback handler  
- Add transaction logging
- Update order status after payment

Closes #123"
```

---

## 🔍 Pull Request Guidelines

### Mẫu PR Description

```markdown
## 📌 Mô Tả
Brief description of what this PR does.

## 🎯 Issue/Task Liên Quan
- Resolves #123
- Related to #456

## 🔨 Những Thay Đổi Chính
- [ ] Feature A: Description
- [ ] Feature B: Description
- [ ] Bug fix: Description

## 📸 Screenshots (nếu có UI changes)
Before: [screenshot]
After: [screenshot]

## ✅ Checklist
- [ ] Code đã được test locally
- [ ] Đã update documentation nếu cần
- [ ] Không có conflict với develop
- [ ] Follow coding standards
- [ ] Unit tests passed (nếu có)

## 🧪 Cách Test
1. Checkout branch này
2. Run backend: `mvn spring-boot:run`
3. Test endpoint: `GET /api/users`
4. Expected result: ...

## 📝 Notes (nếu có)
Any additional notes for reviewers.
```

### Quy Tắc Tạo PR

1. **Title rõ ràng**: 
   - ✅ `feat: Add user authentication with JWT`
   - ❌ `Update code`

2. **Description đầy đủ**: 
   - Giải thích WHAT và WHY
   - Không cần giải thích HOW (code đã nói)

3. **Size hợp lý**:
   - Mỗi PR: 1 tính năng hoặc 1 bugfix
   - Tối đa 300-500 dòng thay đổi
   - Nếu quá lớn, chia thành nhiều PR nhỏ

4. **Labels**:
   - `enhancement` - Tính năng mới
   - `bug` - Sửa lỗi
   - `documentation` - Cập nhật docs
   - `help wanted` - Cần support

5. **Assignees & Reviewers**:
   - Assign chính mình
   - Request review từ Leader hoặc member khác

---

## 👀 Code Review Process

### Cho Người Được Review

**Thái độ**:
- ✅ Cởi mở với feedback
- ✅ Giải thích lý do nếu không đồng ý
- ✅ Cảm ơn reviewer
- ❌ Không defensive hoặc bực bội

**Hành động**:
1. Đọc kỹ comments
2. Sửa theo yêu cầu hợp lý
3. Reply và resolve conversations
4. Re-request review sau khi sửa

### Cho Reviewer

**Trách nhiệm**:
- Review trong vòng 24h
- Kiểm tra logic, code quality, best practices
- Test code nếu có thể
- Đưa feedback constructive

**Cách Comment**:
- ✅ "Suggestion: Extract this to a separate method for better readability"
- ✅ "Question: Why did you choose this approach?"
- ✅ "Nit: Missing JavaDoc for this public method"
- ❌ "This code is bad" (không constructive)
- ❌ "You should know this" (condescending)

**Approve Standards**:
- Code chạy được và đúng logic
- Follow coding standards
- Có comment/doc nếu cần
- Không có security issues
- Performance ổn

---

## 💻 Coding Standards

### Backend (Java/Spring Boot)

#### Naming Conventions
```java
// Class: PascalCase
public class UserController { }

// Method: camelCase
public User getUserById(Long id) { }

// Variables: camelCase
private String firstName;

// Constants: UPPER_SNAKE_CASE
private static final int MAX_LOGIN_ATTEMPTS = 3;

// Package: lowercase
package com.ecommerce.service;
```

#### Code Style
```java
// ✅ Good
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    private final UserService userService;
    
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        User user = userService.findById(id);
        return ResponseEntity.ok(user);
    }
}

// ❌ Bad
@RestController
public class user_controller {
    @Autowired
    UserService us;
    
    @GetMapping("/api/users/{id}")
    public User get(@PathVariable Long i) {
        return us.findById(i);
    }
}
```

#### Best Practices
- Sử dụng `@Slf4j` cho logging (Lombok)
- Không catch generic `Exception`
- Luôn validate input
- Sử dụng DTO cho API responses
- Transaction management cho operations phức tạp

### Frontend (React/JavaScript)

#### Naming Conventions
```javascript
// Component: PascalCase
const UserProfile = () => { }

// Function: camelCase
const fetchUserData = () => { }

// Variables: camelCase
const userName = "John";

// Constants: UPPER_SNAKE_CASE
const API_BASE_URL = "http://localhost:8080/api";

// Files: kebab-case
// user-profile.jsx
// product-card.jsx
```

#### Code Style
```javascript
// ✅ Good
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = ({ userId }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`/api/users/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error('Failed to fetch user:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchUser();
    }, [userId]);
    
    if (loading) return <div>Loading...</div>;
    
    return (
        <div className="user-profile">
            <h1>{user.name}</h1>
            <p>{user.email}</p>
        </div>
    );
};

export default UserProfile;
```

#### Best Practices
- Sử dụng functional components + hooks
- Tách component nhỏ, tái sử dụng
- PropTypes hoặc TypeScript cho type checking
- Tránh inline styles, dùng Tailwind classes
- Custom hooks cho logic tái sử dụng

---

## 🔧 Xử Lý Conflict

### Khi Gặp Merge Conflict

```bash
# 1. Pull develop mới nhất
git checkout develop
git pull origin develop

# 2. Về nhánh feature
git checkout feature/ten-tinh-nang

# 3. Merge develop vào feature
git merge develop

# 4. Nếu có conflict, Git sẽ báo
# CONFLICT (content): Merge conflict in src/main/java/...
```

### Resolve Conflict

1. **Mở file conflict** trong editor
2. **Tìm conflict markers**:
```java
<<<<<<< HEAD (your changes)
public void myMethod() {
    // Your code
}
=======
public void myMethod() {
    // Changes from develop
}
>>>>>>> develop
```

3. **Chọn version phù hợp**:
   - Giữ code của bạn
   - Giữ code từ develop
   - Hoặc kết hợp cả hai

4. **Xóa conflict markers** và **lưu file**

5. **Add và commit**:
```bash
git add .
git commit -m "fix: resolve merge conflict with develop"
git push
```

### Tránh Conflict
- Pull develop hàng ngày
- Giao tiếp với team về file đang làm
- Giữ PR nhỏ và merge nhanh

---

## ✅ Checklist Trước Khi Submit PR

### Code Quality
- [ ] Code chạy được không có lỗi
- [ ] Đã test tất cả cases (happy path + edge cases)
- [ ] Không có code bị comment out (xóa đi)
- [ ] Không có `console.log()` hoặc debug code
- [ ] Follow naming conventions
- [ ] Code đã được format (Prettier/Checkstyle)

### Documentation
- [ ] Thêm/update comments cho code phức tạp
- [ ] Thêm JavaDoc cho public methods (Backend)
- [ ] Update README nếu có thay đổi setup/config
- [ ] Update API docs nếu có endpoint mới

### Testing
- [ ] Unit tests passed (nếu có)
- [ ] Manual testing đã thực hiện
- [ ] Test trên nhiều scenarios khác nhau

### Git
- [ ] Commit messages theo convention
- [ ] Không có merge conflict
- [ ] Branch đã sync với develop mới nhất
- [ ] Không push file nhạy cảm (.env, credentials)

### Pull Request
- [ ] PR title rõ ràng
- [ ] Description đầy đủ
- [ ] Screenshots nếu có UI changes
- [ ] Linked đến issue/task (nếu có)
- [ ] Assigned reviewer

---

## 🆘 Trợ Giúp

### Gặp Vấn Đề?

1. **Check Git status**:
```bash
git status
```

2. **Xem Git log**:
```bash
git log --oneline --graph --all
```

3. **Undo commit cuối** (chưa push):
```bash
git reset --soft HEAD~1
```

4. **Discard tất cả changes** (chưa commit):
```bash
git checkout .
# hoặc
git reset --hard
```

5. **Stash changes tạm thời**:
```bash
git stash        # Save changes
git stash pop    # Restore changes
```

### Liên Hệ
- **Leader**: Ngọc Hân (ngochan@example.com)
- **Git issues**: Tạo issue trên GitHub với label `help wanted`
- **Team chat**: [Link Slack/Discord channel]

---

## 📚 Tài Liệu Tham Khảo

- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Pull Request Best Practices](https://github.com/blog/1943-how-to-write-the-perfect-pull-request)
- [Code Review Best Practices](https://google.github.io/eng-practices/review/)

---

**🎯 Mục tiêu**: Làm việc chuyên nghiệp, học hỏi từ nhau, và xây dựng một sản phẩm chất lượng!

*Happy Coding! 🚀*