package com.un1.ecommerce.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.un1.ecommerce.validation.PasswordMatch;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@PasswordMatch
public class RegisterRequest {

    @NotBlank(message = "Email cannot be blank")
    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "Password cannot be blank")
    @Size(min = 6, message = "Password must be at least 6 characters.")
    private String password;

    @NotBlank(message = "Confirm password cannot be blank")
    private String confirmPassword;

    @NotBlank(message = "Full name cannot be blank")
    private String fullName;
}
