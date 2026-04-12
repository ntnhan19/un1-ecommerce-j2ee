package com.un1.ecommerce.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShippingAddressRequest {

    @NotBlank(message = "Address label cannot be blank")
    private String label;

    @NotBlank(message = "Recipient full name cannot be blank")
    private String fullName;

    @NotBlank(message = "Phone cannot be blank")
    @Size(max = 20, message = "Phone cannot exceed 20 characters")
    private String phone;

    @NotBlank(message = "Province cannot be blank")
    private String province;

    @NotBlank(message = "District cannot be blank")
    private String district;

    @NotBlank(message = "Ward cannot be blank")
    private String ward;

    @NotBlank(message = "Detail address cannot be blank")
    private String detailAddress;

    @Builder.Default
    private boolean isDefault = false;
}
