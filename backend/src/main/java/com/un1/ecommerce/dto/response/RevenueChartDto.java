// RevenueChartDto.java
package com.un1.ecommerce.dto.response;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Builder
public class RevenueChartDto {
    private String month; // VD: "T1", "T2"...
    private BigDecimal revenue;
    private long orders;
}