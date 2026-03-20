package com.un1.ecommerce.repository;

import com.un1.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
    // Custom query methods replaced by JpaSpecificationExecutor for dynamic generic filtering
}
