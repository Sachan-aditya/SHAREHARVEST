package com.example.shareharvest.repository;

import com.example.shareharvest.models.User;
import com.example.shareharvest.models.fooditem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface FoodItemRepository extends JpaRepository<fooditem, Long> {
    List<fooditem> findByDonor(User donor);
    List<fooditem> findByAvailableTrue();
    List<fooditem> findByExpiryDateBefore(LocalDateTime now);
}
