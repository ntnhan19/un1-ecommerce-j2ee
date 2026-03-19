package com.un1.ecommerce.repository;

import com.un1.ecommerce.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
