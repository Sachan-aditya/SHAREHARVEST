package com.example.shareharvest.controller;

import com.example.shareharvest.models.fooditem; // Updated to PascalCase
import com.example.shareharvest.models.User;
import com.example.shareharvest.models.fooditem;
import com.example.shareharvest.services.FoodItemService;
import com.example.shareharvest.services.UserService; // Add UserService for fetching users
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/food-items")
public class FoodItemController {
    @Autowired
    private FoodItemService foodItemService;

    @Autowired
    private UserService userService; // Add UserService for fetching user details

    @GetMapping
    public List<fooditem> getAvailableFoodItems() {
        return foodItemService.getAvailableFoodItems();
    }

    @GetMapping("/donor/{donorId}")
    public List<fooditem> getFoodItemsByDonor(@PathVariable Long donorId) {
        // Fetch the user using UserService instead of creating a new User object
        User donor = userService.findById(donorId);
        return foodItemService.getFoodItemsByDonor(donor);
    }

    @GetMapping("/{id}")
    public ResponseEntity<fooditem> getFoodItemById(@PathVariable Long id) {
        Optional<fooditem> foodItem = foodItemService.getFoodItemById(id);
        return foodItem.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Consolidated addFoodItem method
    @PostMapping
    public ResponseEntity<fooditem> addFoodItem(@RequestBody fooditem foodItem) {
        fooditem savedFoodItem = foodItemService.save(foodItem); // Use the save method
        return ResponseEntity.ok(savedFoodItem);
    }
}