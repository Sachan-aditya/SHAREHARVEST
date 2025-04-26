package com.example.shareharvest.services;
import com.example.shareharvest.models.User;
import com.example.shareharvest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) throws Exception {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new Exception("Username already exists");
        }
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new Exception("Email already exists");
        }
        return userRepository.save(user);
    }

    public User loginUser(String username, String password) throws Exception {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty() || !userOpt.get().getPassword().equals(password)) {
            throw new Exception("Invalid username or password");
        }
        return userOpt.get();
    }

    public void addPoints(Long userId, int points) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        user.setPoints(user.getPoints() + points);
        userRepository.save(user);
    }

    public List<User> getTopUsers() {
        return userRepository.findTop10ByOrderByPointsDesc();
    }

    public void registerPartner(Long userId, String userType) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        if (!List.of("NGO", "Restaurant").contains(userType)) {
            throw new IllegalArgumentException("Invalid user type");
        }
        user.setUserType(userType);
        userRepository.save(user);
    }

    public List<User> getPartners(String userType) {
        return userRepository.findByUserType(userType);
    }
    public User findById(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
    }
}