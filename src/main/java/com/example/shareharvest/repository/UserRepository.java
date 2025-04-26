package com.example.shareharvest.repository;

import com.example.shareharvest.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    List<User> findTop10ByOrderByPointsDesc();
    List<User> findByUserType(String userType);

}