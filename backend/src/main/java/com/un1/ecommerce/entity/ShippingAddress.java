package com.un1.ecommerce.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "shipping_addresses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShippingAddress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Address label cannot be blank")
    @Column(nullable = false, length = 100)
    private String label;

    @NotBlank(message = "Recipient full name cannot be blank")
    @Column(nullable = false, length = 150)
    private String fullName;

    @NotBlank(message = "Phone cannot be blank")
    @Size(max = 20, message = "Phone cannot exceed 20 characters")
    @Column(nullable = false, length = 20)
    private String phone;

    @NotBlank(message = "Province cannot be blank")
    @Column(nullable = false, length = 100)
    private String province;

    @NotBlank(message = "District cannot be blank")
    @Column(nullable = false, length = 100)
    private String district;

    @NotBlank(message = "Ward cannot be blank")
    @Column(nullable = false, length = 100)
    private String ward;

    @NotBlank(message = "Detail address cannot be blank")
    @Column(nullable = false, length = 255)
    private String detailAddress;

    @Builder.Default
    @Column(nullable = false)
    private boolean isDefault = false;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
