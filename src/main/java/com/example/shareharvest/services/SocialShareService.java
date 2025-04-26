package com.example.shareharvest.services;

import com.example.shareharvest.models.User;
import org.springframework.stereotype.Service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
public class SocialShareService {
    private final UserService userService;

    public SocialShareService(UserService userService) {
        this.userService = userService;
    }

    public String generateShareLink(Long userId) {
        User user = userService.findById(userId); // Now works with the fixed findById
        String message = "I donated food on ShareHarvest and earned " + user.getPoints() + " points! Join me to reduce food waste.";
        try {
            return "https://shareharvest.com/share?userId=" + userId + "&message=" + URLEncoder.encode(message, StandardCharsets.UTF_8);
        } catch (Exception e) {
            throw new RuntimeException("Failed to encode share link: " + e.getMessage());
        }
    }
}