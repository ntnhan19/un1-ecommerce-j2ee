package com.un1.ecommerce.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShippingAddressResponse {

    private Long id;
    private String label;
    private String fullName;
    private String phone;
    private String province;
    private String district;
    private String ward;
    private String detailAddress;
    private boolean isDefault;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
