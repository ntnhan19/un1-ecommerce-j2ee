package com.un1.ecommerce.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Estimated body measurements của khách hàng (cm).
 * Được tính từ height, weight, age, gender — hoặc lấy trực tiếp
 * nếu khách tự nhập.
 *
 * Mapping theo productType:
 * TOP / OUTERWEAR → shoulder, chest, waist, sleeveLength, bodyLength
 * BOTTOM → waist, hips, thigh, inseam
 * DRESS → shoulder, chest, waist, hips, bodyLength
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BodyMeasurementsResponse {

    /** Rộng vai cơ thể (cm). */
    private Double shoulder;

    /** Vòng ngực (cm). */
    private Double chest;

    /** Vòng eo (cm). */
    private Double waist;

    /** Vòng hông (cm). */
    private Double hips;

    /** Dài tay (cm). */
    private Double sleeveLength;

    /** Chiều dài thân (cm) — từ vai đến hông. */
    private Double bodyLength;

    /** Vòng bắp đùi (cm). Dùng cho BOTTOM. */
    private Double thigh;

    /** Chiều dài đáy quần / inseam (cm). Dùng cho BOTTOM. */
    private Double inseam;
}