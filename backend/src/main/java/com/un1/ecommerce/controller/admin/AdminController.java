package com.un1.ecommerce.controller.admin;

import com.un1.ecommerce.dto.request.ProductRequest;
import com.un1.ecommerce.dto.response.ProductResponse;
import com.un1.ecommerce.entity.OrderStatus;
import com.un1.ecommerce.service.CategoryService;
import com.un1.ecommerce.service.OrderService;
import com.un1.ecommerce.service.ProductService;
import com.un1.ecommerce.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final ProductService productService;
    private final OrderService orderService;
    private final UserService userService;
    private final CategoryService categoryService;

    @InitBinder
    @SuppressWarnings("unchecked")
    public void initBinder(org.springframework.web.bind.WebDataBinder binder) {
        binder.registerCustomEditor(java.util.List.class, "imageUrls", new java.beans.PropertyEditorSupport() {
            @Override
            public void setAsText(String text) {
                if (text == null || text.trim().isEmpty()) {
                    setValue(new java.util.ArrayList<String>());
                } else {
                    setValue(new java.util.ArrayList<String>(java.util.Arrays.asList(text.split("\\s*,\\s*"))));
                }
            }
            @Override
            public String getAsText() {
                java.util.List<String> list = (java.util.List<String>) getValue();
                return list == null ? "" : String.join(", ", list);
            }
        });
        binder.registerCustomEditor(java.util.List.class, "colors", new java.beans.PropertyEditorSupport() {
            @Override
            public void setAsText(String text) {
                if (text == null || text.trim().isEmpty()) {
                    setValue(new java.util.ArrayList<String>());
                } else {
                    setValue(new java.util.ArrayList<String>(java.util.Arrays.asList(text.split("\\s*,\\s*"))));
                }
            }
            @Override
            public String getAsText() {
                java.util.List<String> list = (java.util.List<String>) getValue();
                return list == null ? "" : String.join(", ", list);
            }
        });
        binder.registerCustomEditor(java.util.List.class, "sizes", new java.beans.PropertyEditorSupport() {
            @Override
            public void setAsText(String text) {
                if (text == null || text.trim().isEmpty()) {
                    setValue(new java.util.ArrayList<String>());
                } else {
                    setValue(new java.util.ArrayList<String>(java.util.Arrays.asList(text.split("\\s*,\\s*"))));
                }
            }
            @Override
            public String getAsText() {
                java.util.List<String> list = (java.util.List<String>) getValue();
                return list == null ? "" : String.join(", ", list);
            }
        });
    }

    @GetMapping("/dashboard")
    public String dashboard(Model model) {
        model.addAttribute("totalProducts", productService.countTotalProducts());
        model.addAttribute("totalOrders", orderService.countTotalOrders());
        model.addAttribute("totalUsers", userService.countTotalUsers());
        model.addAttribute("totalRevenue", orderService.sumTotalRevenue());
        return "admin/dashboard";
    }

    @GetMapping("/login")
    public String login() {
        return "admin/login";
    }

    // --- Product Management ---
    @GetMapping("/products")
    public String listProducts(Model model) {
        model.addAttribute("products", productService.getAllProductsList());
        return "admin/products";
    }

    @GetMapping("/products/new")
    public String showProductForm(Model model) {
        model.addAttribute("product", new ProductRequest());
        model.addAttribute("categories", categoryService.getAllCategories());
        return "admin/product-form";
    }

    @GetMapping("/products/edit/{id}")
    public String editProduct(@PathVariable Long id, Model model) {
        ProductResponse product = productService.getProductById(id);
        // Map ProductResponse to ProductRequest for the form
        ProductRequest request = ProductRequest.builder()
                .name(product.getName())
                .price(product.getPrice())
                .stock(product.getStock())
                .description(product.getDescription())
                .categoryId(product.getCategoryId())
                .imageUrls(product.getImageUrls())
                .colors(product.getColors())
                .sizes(product.getSizes())
                .build();
        model.addAttribute("product", request);
        model.addAttribute("productId", id);
        model.addAttribute("categories", categoryService.getAllCategories());
        return "admin/product-form";
    }

    @PostMapping("/products/save")
    public String saveProduct(@Valid @ModelAttribute("product") ProductRequest request, 
                               BindingResult result, 
                               @RequestParam(value = "id", required = false) Long id,
                               Model model) {
        if (result.hasErrors()) {
            model.addAttribute("categories", categoryService.getAllCategories());
            return "admin/product-form";
        }

        if (id != null) {
            productService.updateProduct(id, request);
        } else {
            productService.createProduct(request);
        }
        return "redirect:/admin/products";
    }

    @PostMapping("/products/delete/{id}")
    public String deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return "redirect:/admin/products";
    }

    // --- Order Management ---
    @GetMapping("/orders")
    public String listOrders(Model model) {
        model.addAttribute("orders", orderService.getAllOrders());
        model.addAttribute("statusOptions", OrderStatus.values());
        return "admin/orders";
    }

    @PostMapping("/orders/update-status")
    public String updateOrderStatus(@RequestParam Long orderId, @RequestParam OrderStatus status) {
        orderService.updateStatus(orderId, status);
        return "redirect:/admin/orders";
    }

    // --- User Management ---
    @GetMapping("/users")
    public String listUsers(Model model) {
        model.addAttribute("users", userService.getAllUsers());
        return "admin/users";
    }

    // --- Category Management ---
    @GetMapping("/categories")
    public String listCategories(Model model) {
        model.addAttribute("categories", categoryService.getAllCategories());
        return "admin/categories";
    }

    @GetMapping("/categories/new")
    public String newCategory(Model model) {
        model.addAttribute("category", new com.un1.ecommerce.entity.Category());
        return "admin/category-form";
    }

    @GetMapping("/categories/edit/{id}")
    public String editCategory(@PathVariable Long id, Model model) {
        model.addAttribute("category", categoryService.getCategoryById(id));
        return "admin/category-form";
    }

    @PostMapping("/categories/save")
    public String saveCategory(@RequestParam(required = false) Long id, 
                               @RequestParam String name, 
                               @RequestParam(required = false) String description) {
        com.un1.ecommerce.entity.Category category;
        if (id != null) {
            category = categoryService.getCategoryById(id);
        } else {
            category = new com.un1.ecommerce.entity.Category();
        }
        category.setName(name);
        category.setDescription(description);
        categoryService.saveCategory(category);
        return "redirect:/admin/categories";
    }

    @PostMapping("/categories/delete/{id}")
    public String deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return "redirect:/admin/categories";
    }
}
