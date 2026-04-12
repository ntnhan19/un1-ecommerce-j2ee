package com.un1.ecommerce.service.impl;

import com.un1.ecommerce.dto.request.SizeRecommendationRequest;
import com.un1.ecommerce.dto.response.BodyMeasurementsResponse;
import com.un1.ecommerce.dto.response.FitDetailResponse;
import com.un1.ecommerce.dto.response.SizeFitResultResponse;
import com.un1.ecommerce.dto.response.SizeRecommendationResponse;
import com.un1.ecommerce.entity.Product;
import com.un1.ecommerce.entity.ProductMeasurements;
import com.un1.ecommerce.entity.ProductType;
import com.un1.ecommerce.entity.ProductVariant;
import com.un1.ecommerce.exception.BadRequestException;
import com.un1.ecommerce.exception.ResourceNotFoundException;
import com.un1.ecommerce.repository.ProductRepository;
import com.un1.ecommerce.service.SizeRecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SizeRecommendationServiceImpl implements SizeRecommendationService {

    private final ProductRepository productRepository;

    // 1. Inject GeminiService vào đây
    private final GeminiServiceImpl geminiService;

    // ─── Entry point ──────────────────────────────────────────────────────────

    @Override
    public SizeRecommendationResponse recommend(SizeRecommendationRequest request) {
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sản phẩm"));

        if (product.getProductType() == null) {
            throw new BadRequestException(
                    "Sản phẩm chưa được phân loại (productType). Vui lòng cập nhật trước khi tư vấn size.");
        }

        if (product.getVariants() == null || product.getVariants().isEmpty()) {
            throw new BadRequestException("Sản phẩm chưa có variant để tư vấn size.");
        }

        ProductType type = product.getProductType();
        validateMeasurementData(product, type);

        // Estimate (hoặc lấy trực tiếp) số đo cơ thể khách
        BodyMeasurementsResponse bodyMeasurements = estimateBodyMeasurements(request, type);

        // Tính score từng variant còn hàng
        List<SizeFitResultResponse> rawResults = product.getVariants().stream()
                .filter(v -> v.getStock() != null && v.getStock() > 0)
                .map(v -> evaluateVariant(v, bodyMeasurements, type, request.getFitPreference()))
                .sorted(Comparator.comparingInt(SizeFitResultResponse::getScore).reversed()
                        .thenComparing(SizeFitResultResponse::getSize))
                .collect(Collectors.toList());

        // Consolidate: mỗi size giữ lại variant có score cao nhất
        List<SizeFitResultResponse> consolidated = rawResults.stream()
                .collect(Collectors.groupingBy(SizeFitResultResponse::getSize))
                .values().stream()
                .map(group -> group.stream()
                        .max(Comparator.comparingInt(SizeFitResultResponse::getScore))
                        .orElseThrow())
                .sorted(Comparator.comparingInt(SizeFitResultResponse::getScore).reversed()
                        .thenComparing(SizeFitResultResponse::getSize))
                .collect(Collectors.toList());

        if (consolidated.isEmpty()) {
            throw new BadRequestException("Không còn variant nào còn hàng để tư vấn.");
        }

        SizeFitResultResponse best = consolidated.get(0);

        // 2. GỌI GEMINI API ĐỂ LẤY LỜI TƯ VẤN MỀM MẠI
        String fallbackSummary = best.getSummary(); // Giữ lại summary cứng làm dự phòng
        String prompt = buildGeminiPrompt(request, product, best);

        // Gọi AI (nếu AI lỗi hoặc timeout, sẽ trả về null)
        String geminiSummary = geminiService.generateFashionAdvice(prompt);

        // Graceful Fallback: Nếu AI trả lời thành công thì dùng, nếu lỗi thì dùng dòng
        // text mặc định
        String finalSummary = (geminiSummary != null && !geminiSummary.isBlank()) ? geminiSummary : fallbackSummary;

        return SizeRecommendationResponse.builder()
                .productId(product.getId())
                .productName(product.getName())
                .productType(product.getProductType().name())
                .recommendedSize(best.getSize())
                .recommendationSummary(finalSummary)
                .estimatedMeasurements(bodyMeasurements)
                .allSizeResults(consolidated)
                .build();
    }

    // ─── Prompt Engineering cho Gemini ─────────────────────────────────────────

    private String buildGeminiPrompt(SizeRecommendationRequest req, Product product, SizeFitResultResponse bestFit) {
        String fitPrefStr = switch (req.getFitPreference() != null ? req.getFitPreference() : 2) {
            case 0 -> "rất ôm bó sát";
            case 1 -> "ôm vừa vặn";
            case 3 -> "thoải mái";
            case 4 -> "rộng rãi (oversize)";
            default -> "vừa vặn tiêu chuẩn";
        };

        String genderStr = isMale(req.getGender()) ? "Nam" : "Nữ";

        StringBuilder detailsStr = new StringBuilder();
        for (FitDetailResponse detail : bestFit.getDetails()) {
            detailsStr.append("- ").append(detail.getArea()).append(": ").append(detail.getStatus()).append("\n");
        }

        return String.format(
                "Bạn là một chuyên gia tư vấn thời trang AI của thương hiệu UN1. " +
                        "Thông tin khách hàng: Cao %.1f cm, Nặng %.1f kg, Giới tính %s, Sở thích mặc: %s. " +
                        "Sản phẩm đang xem: %s. " +
                        "Hệ thống đã tính toán Size phù hợp nhất là: %s. " +
                        "Chi tiết độ fit của size này trên cơ thể khách:\n%s" +
                        "Dựa vào các thông tin trên, hãy viết 1 đoạn văn ngắn (khoảng 2-3 câu) để tư vấn trực tiếp cho khách hàng. "
                        +
                        "Giải thích tại sao size %s lại hợp với họ, xưng hô 'bạn' và 'UN1'. Giọng văn thân thiện, chuyên nghiệp, không dài dòng.",
                req.getHeight(), req.getWeight(), genderStr, fitPrefStr, // %.1f cho Double
                product.getName(), bestFit.getSize(), detailsStr.toString(), bestFit.getSize());
    }

    // ─── Validation ───────────────────────────────────────────────────────────

    private void validateMeasurementData(Product product, ProductType type) {
        // Chỉ cần sản phẩm có MỘT variant bất kỳ chứa MỘT thông số đo bất kỳ là được
        boolean hasMeasurements = product.getVariants().stream()
                .anyMatch(v -> hasAnyMeasurement(v.getMeasurements()));

        if (!hasMeasurements) {
            throw new BadRequestException(
                    "Sản phẩm này chưa được nhà cung cấp cập nhật bất kỳ thông số đo nào (Ngực, eo, dài...). " +
                            "AI không thể tư vấn nếu không có kích thước thực tế của áo/quần.");
        }
    }

    // Hàm mới: Kiểm tra xem có ít nhất 1 thông số không bị null
    private boolean hasAnyMeasurement(ProductMeasurements m) {
        if (m == null)
            return false;
        return m.getChestWidth() != null ||
                m.getShoulderWidth() != null ||
                m.getWaistWidth() != null ||
                m.getHipWidth() != null ||
                m.getSleeveLength() != null ||
                m.getBodyLength() != null ||
                m.getThighWidth() != null ||
                m.getInseam() != null;
    }

    // ─── Body measurement estimation ─────────────────────────────────────────

    private BodyMeasurementsResponse estimateBodyMeasurements(SizeRecommendationRequest req, ProductType type) {

        boolean isMale = isMale(req.getGender());
        double h = req.getHeight();
        double w = req.getWeight();
        int age = req.getAge() != null ? req.getAge() : 25; // Default age if null
        double bmi = w / Math.pow(h / 100.0, 2);

        // ── Ước lượng từng số đo cơ thể ────────────────────────────────────
        double chest = isMale
                ? h * 0.53 + w * 0.33 - Math.max(0, age - 30) * 0.03
                : h * 0.51 + w * 0.31 - Math.max(0, age - 30) * 0.025;
        double shoulder = isMale
                ? h * 0.255 + w * 0.045
                : h * 0.235 + w * 0.040;
        double waist = isMale
                ? chest * 0.88 + Math.max(0, bmi - 22) * 1.2
                : chest * 0.78 + Math.max(0, bmi - 21) * 1.1;
        double hips = isMale
                ? waist * 1.03 + 2.5
                : waist * 1.12 + 4.0;
        double thigh = isMale
                ? hips * 0.32 + w * 0.06
                : hips * 0.34 + w * 0.07;
        double inseam = isMale
                ? h * 0.455
                : h * 0.445;
        double sleeveLength = h * 0.36;
        double bodyLength = h * 0.41;

        // ── Override bằng giá trị khách tự nhập nếu có ─────────────────────
        return BodyMeasurementsResponse.builder()
                .shoulder(r1(req.getShoulder() != null ? req.getShoulder() : shoulder))
                .chest(r1(req.getChest() != null ? req.getChest() : chest))
                .waist(r1(req.getWaist() != null ? req.getWaist() : waist))
                .hips(r1(req.getHips() != null ? req.getHips() : hips))
                .thigh(r1(req.getThigh() != null ? req.getThigh() : thigh))
                .inseam(r1(req.getInseam() != null ? req.getInseam() : inseam))
                .sleeveLength(r1(sleeveLength))
                .bodyLength(r1(bodyLength))
                .build();
    }

    // ─── Fit scoring ──────────────────────────────────────────────────────────

    private SizeFitResultResponse evaluateVariant(
            ProductVariant variant,
            BodyMeasurementsResponse body,
            ProductType type,
            Integer fitPreference) {

        double ease = resolveEaseAllowance(fitPreference);
        List<FitDetailResponse> details = new ArrayList<>();
        int penalty = 0;

        penalty += switch (type) {
            case TOP, OUTERWEAR -> scoreTop(variant.getMeasurements(), body, ease, details);
            case BOTTOM -> scoreBottom(variant.getMeasurements(), body, ease, details);
            case DRESS -> scoreDress(variant.getMeasurements(), body, ease, details);
        };

        int score = Math.max(0, 100 - penalty);

        long tightCount = details.stream().filter(d -> "Chật".equals(d.getStatus())).count();
        long looseCount = details.stream().filter(d -> "Rộng".equals(d.getStatus())).count();
        String overallFit = tightCount >= 2 ? "Ôm/chật" : looseCount >= 3 ? "Rộng" : "Vừa vặn";
        String summary = buildSummary(variant.getSize(), overallFit, details);

        return SizeFitResultResponse.builder()
                .variantId(variant.getId())
                .size(variant.getSize())
                .colorName(variant.getColorName())
                .score(score)
                .overallFit(overallFit)
                .summary(summary)
                .details(details)
                .build();
    }

    private int scoreTop(ProductMeasurements m, BodyMeasurementsResponse body,
            double ease, List<FitDetailResponse> details) {
        int p = 0;
        p += check("Vai", m, body.getShoulder(), ease * 0.45, AreaType.SHOULDER, details);
        p += check("Ngực", m, body.getChest(), ease, AreaType.CHEST, details);
        p += check("Eo", m, body.getWaist(), ease * 0.55, AreaType.WAIST, details);
        p += check("Dài thân", m, body.getBodyLength(), 4.0, AreaType.BODY_LENGTH, details);
        p += check("Dài tay", m, body.getSleeveLength(), 3.0, AreaType.SLEEVE_LENGTH, details);
        return p;
    }

    private int scoreBottom(ProductMeasurements m, BodyMeasurementsResponse body,
            double ease, List<FitDetailResponse> details) {
        int p = 0;
        p += check("Eo", m, body.getWaist(), ease * 0.6, AreaType.WAIST, details);
        p += check("Hông", m, body.getHips(), ease * 0.65, AreaType.HIPS, details);
        p += check("Bắp đùi", m, body.getThigh(), ease * 0.5, AreaType.THIGH, details);
        p += check("Dài đáy quần", m, body.getInseam(), 3.0, AreaType.INSEAM, details);
        p += check("Dài quần", m, body.getBodyLength(), 4.0, AreaType.BODY_LENGTH, details);
        return p;
    }

    private int scoreDress(ProductMeasurements m, BodyMeasurementsResponse body,
            double ease, List<FitDetailResponse> details) {
        int p = 0;
        p += check("Vai", m, body.getShoulder(), ease * 0.40, AreaType.SHOULDER, details);
        p += check("Ngực", m, body.getChest(), ease, AreaType.CHEST, details);
        p += check("Eo", m, body.getWaist(), ease * 0.55, AreaType.WAIST, details);
        p += check("Hông", m, body.getHips(), ease * 0.65, AreaType.HIPS, details);
        p += check("Dài thân", m, body.getBodyLength(), 4.0, AreaType.BODY_LENGTH, details);
        return p;
    }

    // ─── Area evaluation ──────────────────────────────────────────────────────

    private int check(String label, ProductMeasurements m, Double bodyValue, double ease, AreaType type,
            List<FitDetailResponse> details) {
        if (m == null || bodyValue == null)
            return 0;

        Double garment = switch (type) {
            case CHEST -> m.getChestWidth();
            case SHOULDER -> m.getShoulderWidth();
            case WAIST -> m.getWaistWidth();
            case HIPS -> m.getHipWidth();
            case THIGH -> m.getThighWidth();
            case INSEAM -> m.getInseam();
            case BODY_LENGTH -> m.getBodyLength();
            case SLEEVE_LENGTH -> m.getSleeveLength();
        };

        if (garment == null)
            return 0;

        double expected = bodyValue + ease;
        double diff = r1(garment - expected);

        boolean isLength = type == AreaType.BODY_LENGTH
                || type == AreaType.SLEEVE_LENGTH
                || type == AreaType.INSEAM;

        String status;
        int penalty;

        if (diff < -2.0) {
            status = "Chật";
            penalty = isLength ? 10 : 22;
        } else if (diff > (isLength ? 5.0 : 4.0)) {
            status = "Rộng";
            penalty = isLength ? 5 : 10;
        } else {
            status = "Vừa";
            penalty = (int) Math.round(Math.abs(diff));
        }

        details.add(FitDetailResponse.builder()
                .area(label)
                .status(status)
                .difference(diff)
                .message(buildDetailMessage(label, status, diff))
                .build());

        return penalty;
    }

    // ─── Summary / message helpers ────────────────────────────────────────────

    private String buildSummary(String size, String overallFit, List<FitDetailResponse> details) {
        List<String> nonIdeal = details.stream()
                .filter(d -> !"Vừa".equals(d.getStatus()))
                .map(d -> d.getArea().toLowerCase(Locale.ROOT) + " " + d.getStatus().toLowerCase(Locale.ROOT))
                .toList();

        if (nonIdeal.isEmpty()) {
            return "Size " + size + " có độ fit cân bằng và mặc " + overallFit.toLowerCase(Locale.ROOT) + ".";
        }
        return "Size " + size + " thiên về " + overallFit.toLowerCase(Locale.ROOT)
                + ", nổi bật ở " + String.join(", ", nonIdeal) + ".";
    }

    private String buildDetailMessage(String area, String status, double diff) {
        String sign = diff >= 0 ? "+" : "";
        return area + " " + status.toLowerCase(Locale.ROOT)
                + " (" + sign + r1(diff) + " cm so với mức lý tưởng)";
    }

    // ─── Ease allowance ───────────────────────────────────────────────────────

    private double resolveEaseAllowance(Integer fitPreference) {
        return switch (fitPreference != null ? fitPreference : 2) {
            case 0 -> 1.5;
            case 1 -> 3.0;
            case 3 -> 5.5;
            case 4 -> 7.5;
            default -> 4.0;
        };
    }

    // ─── Utilities ────────────────────────────────────────────────────────────

    private boolean isMale(String gender) {
        if (gender == null)
            return false;
        return "male".equalsIgnoreCase(gender)
                || "nam".equalsIgnoreCase(gender)
                || "MALE".equals(gender);
    }

    private double r1(Double value) {
        if (value == null)
            return 0.0;
        return Math.round(value * 10.0) / 10.0;
    }

    // ─── AreaType ─────────────────────────────────────────────────────────────

    private enum AreaType {
        CHEST, SHOULDER, WAIST, HIPS, THIGH, INSEAM, BODY_LENGTH, SLEEVE_LENGTH
    }
}