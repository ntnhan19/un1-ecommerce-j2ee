// TopProductDto.java
package com.un1.ecommerce.dto.response;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Builder
public class TopProductDto {
    private Long id;
    private String name;
    private String categoryName;
    private long sold;
    private BigDecimal revenue;
}