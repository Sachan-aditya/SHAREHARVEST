package com.example.shareharvest.controller;
import com.example.shareharvest.models.User;
import com.example.shareharvest.services.SocialShareService;
import com.example.shareharvest.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private SocialShareService socialShareService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User registeredUser = userService.registerUser(user);
            return ResponseEntity.ok(registeredUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            User loggedInUser = userService.loginUser(user.getUsername(), user.getPassword());
            return ResponseEntity.ok(loggedInUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PutMapping("/{id}/points")
    public ResponseEntity<Void> addPoints(@PathVariable Long id, @RequestParam int points) {
        userService.addPoints(id, points);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/leaderboard")
    public ResponseEntity<List<User>> getLeaderboard() {
        return ResponseEntity.ok(userService.getTopUsers());
    }
    @GetMapping("/{id}/share-link")
    public ResponseEntity<String> getShareLink(@PathVariable Long id) {
        return ResponseEntity.ok(socialShareService.generateShareLink(id));
    }
    @PutMapping("/{id}/register-partner")
    public ResponseEntity<Void> registerPartner(@PathVariable Long id, @RequestParam String userType) {
        userService.registerPartner(id, userType);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/partners")
    public ResponseEntity<List<User>> getPartners(@RequestParam String userType) {
        return ResponseEntity.ok(userService.getPartners(userType));
    }
}