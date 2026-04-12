package com.un1.ecommerce.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Garment measurements (cm) cho một product variant.
 * Tất cả field nullable — admin chỉ cần điền đúng field theo productType:
 *
 * TOP / OUTERWEAR → chestWidth, shoulderWidth, waistWidth, sleeveLength,
 * bodyLength
 * BOTTOM → waistWidth, hipWidth, thighWidth, inseam, bodyLength
 * DRESS → shoulderWidth, chestWidth, waistWidth, hipWidth, bodyLength
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductMeasurementsRequest {

    /** Rộng ngực / rộng thân (cm). TOP, OUTERWEAR, DRESS. */
    private Double chestWidth;

    /** Rộng vai (cm). TOP, OUTERWEAR, DRESS. */
    private Double shoulderWidth;

    /** Rộng eo (cm). Tất cả loại. */
    private Double waistWidth;

    /** Rộng hông (cm). BOTTOM, DRESS. */
    private Double hipWidth;

    /** Dài tay (cm). TOP, OUTERWEAR. */
    private Double sleeveLength;

    /** Dài thân / dài quần (cm). Tất cả loại. */
    private Double bodyLength;

    /** Rộng bắp đùi (cm). BOTTOM. */
    private Double thighWidth;

    /** Chiều dài đáy quần / inseam (cm). BOTTOM. */
    private Double inseam;
}