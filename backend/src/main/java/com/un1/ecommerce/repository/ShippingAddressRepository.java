package com.un1.ecommerce.repository;

import com.un1.ecommerce.entity.ShippingAddress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ShippingAddressRepository extends JpaRepository<ShippingAddress, Long> {
    List<ShippingAddress> findByUserIdOrderByIsDefaultDescUpdatedAtDesc(Long userId);
    Optional<ShippingAddress> findByIdAndUserId(Long id, Long userId);
}
