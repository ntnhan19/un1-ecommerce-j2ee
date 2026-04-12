// RecentOrderDto.java
package com.un1.ecommerce.dto.response;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class RecentOrderDto {
    private Long id;
    private String customer;
    private String email;
    private LocalDateTime date;
    private BigDecimal total;
    private String status;
}