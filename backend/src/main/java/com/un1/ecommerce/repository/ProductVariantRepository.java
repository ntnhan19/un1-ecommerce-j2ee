package com.un1.ecommerce.repository;

import com.un1.ecommerce.entity.Product;
import com.un1.ecommerce.entity.ProductVariant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductVariantRepository extends JpaRepository<ProductVariant, Long> {

    List<ProductVariant> findAllByProduct(Product product);

    @Modifying
    @Query("DELETE FROM ProductVariant v WHERE v.product = :product")
    void deleteAllByProduct(@Param("product") Product product);

    /**
     * Used by SizeRecommendationService — fetch only variants that have
     * at least one measurement field filled in, so the AI scoring is meaningful.
     */
    @Query("""
            SELECT v FROM ProductVariant v
            WHERE v.product.id = :productId
              AND v.stock > 0
              AND (
                  v.measurements.chestWidth   IS NOT NULL OR
                  v.measurements.shoulderWidth IS NOT NULL OR
                  v.measurements.waistWidth   IS NOT NULL OR
                  v.measurements.hipWidth     IS NOT NULL
              )
            """)
    List<ProductVariant> findScoredVariantsByProductId(@Param("productId") Long productId);
}