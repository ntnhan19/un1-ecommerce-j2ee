package com.un1.ecommerce.repository;

import com.un1.ecommerce.entity.Gender;
import com.un1.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

        @Query("""
                        SELECT p FROM Product p
                        LEFT JOIN p.category c
                        WHERE (:keyword    IS NULL
                                   OR LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%'))
                                   OR LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%')))
                          AND (:categoryId IS NULL OR c.id = :categoryId)
                          AND (:featured   IS NULL OR p.featured = :featured)
                          AND (:gender     IS NULL OR p.gender = :gender OR p.gender = 'UNISEX')
                        """)
        Page<Product> findByFilters(
                        @Param("keyword") String keyword,
                        @Param("categoryId") Long categoryId,
                        @Param("featured") Boolean featured,
                        @Param("gender") Gender gender,
                        Pageable pageable);
}