package com.un1.ecommerce.entity;

import com.un1.ecommerce.dto.ColorDto;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal price;

    @Column(nullable = false)
    @Builder.Default
    private Integer stock = 0;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    /**
     * Product-level image URLs stored as a simple JSON array.
     * Requires a JSON type mapping (Hibernate 6 @JdbcTypeCode or a custom
     * converter).
     */
    @ElementCollection
    @CollectionTable(name = "product_image_urls", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "image_url", columnDefinition = "TEXT")
    @Builder.Default
    private List<String> imageUrls = new ArrayList<>();

    /**
     * Color list stored as JSON (name + hex per color).
     * Uses @Convert with a JPA AttributeConverter — see ColorDtoListConverter.
     */
    @Convert(converter = com.un1.ecommerce.converter.ColorDtoListConverter.class)
    @Column(name = "colors", columnDefinition = "TEXT")
    @Builder.Default
    private List<ColorDto> colors = new ArrayList<>();

    /**
     * Size list stored as a comma-separated string or JSON.
     * Uses @Convert — see StringListConverter.
     */
    @Convert(converter = com.un1.ecommerce.converter.StringListConverter.class)
    @Column(name = "sizes", columnDefinition = "TEXT")
    @Builder.Default
    private List<String> sizes = new ArrayList<>();

    @Builder.Default
    private Boolean featured = false;

    /**
     * Per-variant stock and measurements.
     * CascadeType.ALL — persisted via ProductServiceImpl; orphanRemoval keeps DB
     * clean.
     */
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @Builder.Default
    private List<ProductVariant> variants = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private ProductType productType;

    @Enumerated(EnumType.STRING)
    private Gender gender;
}