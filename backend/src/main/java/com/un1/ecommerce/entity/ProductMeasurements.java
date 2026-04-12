package com.un1.ecommerce.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

/**
 * Garment measurements (cm) embedded in ProductVariant.
 *
 * Mapping theo productType:
 *
 * TOP / OUTERWEAR → chestWidth, shoulderWidth, waistWidth, sleeveLength,
 * bodyLength
 * BOTTOM → waistWidth, hipWidth, thighWidth, inseam, bodyLength (chiều dài
 * quần)
 * DRESS → shoulderWidth, chestWidth, waistWidth, hipWidth, bodyLength
 *
 * Tất cả các field đều nullable. Admin chỉ cần điền đúng các field
 * tương ứng với productType — SizeRecommendationService sẽ bỏ qua
 * các field null khi tính score.
 */
@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductMeasurements {

    // ─── TOP / OUTERWEAR / DRESS ──────────────────────────────────────────────

    /** Rộng ngực / rộng thân (cm). Dùng cho: TOP, OUTERWEAR, DRESS. */
    @Column(name = "chest_width")
    private Double chestWidth;

    /** Rộng vai (cm). Dùng cho: TOP, OUTERWEAR, DRESS. */
    @Column(name = "shoulder_width")
    private Double shoulderWidth;

    /** Dài tay (cm). Dùng cho: TOP, OUTERWEAR. */
    @Column(name = "sleeve_length")
    private Double sleeveLength;

    // ─── SHARED (TOP + BOTTOM + DRESS) ────────────────────────────────────────

    /**
     * Rộng eo (cm).
     * TOP/OUTERWEAR: số đo vòng eo thân áo.
     * BOTTOM/DRESS: số đo cạp quần / eo váy.
     */
    @Column(name = "waist_width")
    private Double waistWidth;

    /**
     * Dài thân / dài quần (cm).
     * TOP: từ vai đến gấu áo.
     * BOTTOM: tổng chiều dài quần từ cạp đến lai.
     * DRESS: từ vai đến gấu váy.
     */
    @Column(name = "body_length")
    private Double bodyLength;

    // ─── BOTTOM / DRESS ───────────────────────────────────────────────────────

    /** Rộng hông (cm). Dùng cho: BOTTOM, DRESS. */
    @Column(name = "hip_width")
    private Double hipWidth;

    /**
     * Rộng bắp đùi (cm) — đo vòng quanh phần to nhất của đùi.
     * Dùng cho: BOTTOM.
     */
    @Column(name = "thigh_width")
    private Double thighWidth;

    /**
     * Chiều dài đáy quần / inseam (cm) — đo từ đáy quần đến lai.
     * Dùng cho: BOTTOM.
     */
    @Column(name = "inseam")
    private Double inseam;
}