package com.un1.ecommerce.repository;

import com.un1.ecommerce.entity.ProductCollection;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductCollectionRepository extends JpaRepository<ProductCollection, Long> {
    List<ProductCollection> findByActiveTrue();
}
