package com.un1.ecommerce.controller.admin;

import com.un1.ecommerce.dto.ColorDto;
import com.un1.ecommerce.dto.request.ProductMeasurementsRequest;
import com.un1.ecommerce.dto.request.ProductRequest;
import com.un1.ecommerce.dto.request.ProductVariantRequest;
import com.un1.ecommerce.dto.response.ProductResponse;
import com.un1.ecommerce.entity.Gender;
import com.un1.ecommerce.entity.OrderStatus;
import com.un1.ecommerce.entity.ProductType;
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

import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final ProductService productService;
    private final OrderService orderService;
    private final UserService userService;
    private final CategoryService categoryService;

    // ─── Dashboard ───────────────────────────────────────────────────────────

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

    // ─── Product Management ──────────────────────────────────────────────────

    @GetMapping("/products")
    public String listProducts(Model model) {
        model.addAttribute("products", productService.getAllProductsList());
        return "admin/products";
    }

    @GetMapping("/products/new")
    public String showProductForm(Model model) {
        model.addAttribute("product", new ProductRequest());
        model.addAttribute("categories", categoryService.getAllCategories());
        model.addAttribute("productTypes", ProductType.values());
        model.addAttribute("genders", Gender.values());
        return "admin/product-form";
    }

    @GetMapping("/products/edit/{id}")
    public String editProduct(@PathVariable Long id, Model model) {
        ProductResponse product = productService.getProductById(id);

        List<ProductVariantRequest> variantRequests = null;
        if (product.getVariants() != null) {
            variantRequests = product.getVariants().stream()
                    .map(v -> {
                        ProductMeasurementsRequest measurements = null;
                        if (v.getMeasurements() != null) {
                            measurements = ProductMeasurementsRequest.builder()
                                    .chestWidth(v.getMeasurements().getChestWidth())
                                    .shoulderWidth(v.getMeasurements().getShoulderWidth())
                                    .waistWidth(v.getMeasurements().getWaistWidth())
                                    .hipWidth(v.getMeasurements().getHipWidth())
                                    .sleeveLength(v.getMeasurements().getSleeveLength())
                                    .bodyLength(v.getMeasurements().getBodyLength())
                                    .thighWidth(v.getMeasurements().getThighWidth())
                                    .inseam(v.getMeasurements().getInseam())
                                    .build();
                        }
                        return ProductVariantRequest.builder()
                                .id(v.getId())
                                .size(v.getSize())
                                .colorName(v.getColorName())
                                .colorHex(v.getColorHex())
                                .stock(v.getStock())
                                .measurements(measurements)
                                .build();
                    })
                    .collect(Collectors.toList());
        }

        ProductRequest request = ProductRequest.builder()
                .name(product.getName())
                .price(product.getPrice())
                .stock(product.getStock())
                .description(product.getDescription())
                .categoryId(product.getCategoryId())
                .imageUrls(product.getImageUrls())
                .colors(product.getColors())
                .sizes(product.getSizes())
                .variants(variantRequests)
                .featured(product.getFeatured())
                .productType(product.getProductType())
                .gender(product.getGender())
                .build();

        model.addAttribute("product", request);
        model.addAttribute("productId", id);
        model.addAttribute("categories", categoryService.getAllCategories());
        model.addAttribute("productTypes", ProductType.values());
        model.addAttribute("genders", Gender.values());
        return "admin/product-form";
    }

    @PostMapping("/products/save")
    public String saveProduct(
            @Valid @ModelAttribute("product") ProductRequest request,
            BindingResult result,
            @RequestParam(value = "id", required = false) Long id,
            Model model) {

        if (result.hasErrors()) {
            model.addAttribute("categories", categoryService.getAllCategories());
            model.addAttribute("productTypes", ProductType.values());
            model.addAttribute("genders", Gender.values());
            return "admin/product-form";
        }

        // Derive colors và sizes từ variants nếu chưa có
        if (request.getVariants() != null && !request.getVariants().isEmpty()) {
            if (request.getColors() == null || request.getColors().isEmpty()) {
                List<ColorDto> derivedColors = request.getVariants().stream()
                        .collect(Collectors.toMap(
                                ProductVariantRequest::getColorName,
                                v -> new ColorDto(v.getColorName(), v.getColorHex()),
                                (existing, duplicate) -> existing))
                        .values().stream()
                        .collect(Collectors.toList());
                request.setColors(derivedColors);
            }

            if (request.getSizes() == null || request.getSizes().isEmpty()) {
                List<String> derivedSizes = request.getVariants().stream()
                        .map(ProductVariantRequest::getSize)
                        .distinct()
                        .collect(Collectors.toList());
                request.setSizes(derivedSizes);
            }
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

    // ─── Order Management ────────────────────────────────────────────────────

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

    // ─── User Management ─────────────────────────────────────────────────────

    @GetMapping("/users")
    public String listUsers(Model model) {
        model.addAttribute("users", userService.getAllUsers());
        return "admin/users";
    }

    // ─── Category Management ─────────────────────────────────────────────────

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
    public String saveCategory(
            @RequestParam(required = false) Long id,
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