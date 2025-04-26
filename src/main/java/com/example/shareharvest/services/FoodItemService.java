package com.example.shareharvest.services;

import com.example.shareharvest.models.User;
import com.example.shareharvest.models.fooditem;
import com.example.shareharvest.repository.FoodItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class FoodItemService {

    @Autowired
    private FoodItemRepository foodItemRepository;

    public List<fooditem> getAvailableFoodItems() {
        return foodItemRepository.findByAvailableTrue();
    }

    public List<fooditem> getFoodItemsByDonor(User donor) {
        return foodItemRepository.findByDonor(donor);
    }

    public Optional<fooditem> getFoodItemById(Long id) {
        return foodItemRepository.findById(id);
    }

    public fooditem addFoodItem(fooditem foodItem) {
        return foodItemRepository.save(foodItem);
    }

    public void markAsUnavailable(Long id) {
        Optional<fooditem> foodItemOpt = foodItemRepository.findById(id);
        foodItemOpt.ifPresent(foodItem -> {
            foodItem.setAvailable(false);
            foodItemRepository.save(foodItem);
        });
    }
    @Scheduled(cron = "0 0 0 * * ?") // Runs daily at midnight
    public void deleteExpiredItems() {
        List<fooditem> expiredItems = foodItemRepository.findByExpiryDateBefore(LocalDateTime.now());
        foodItemRepository.deleteAll(expiredItems);
    }

    public fooditem save(fooditem foodItem) {
        return foodItemRepository.save(foodItem);
    }

}
