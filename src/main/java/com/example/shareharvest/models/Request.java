package com.example.shareharvest.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "requests")
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "food_item_id", nullable = false)
    private fooditem foodItem;

    @ManyToOne
    @JoinColumn(name = "receiver_id", nullable = false)
    private User receiver;

    private LocalDateTime requestDate = LocalDateTime.now();

    private String status = "PENDING"; // PENDING, ACCEPTED, REJECTED

    // ✅ Getter and Setter for 'status'
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    // ✅ Optional: Other getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public fooditem getFoodItem() {
        return foodItem;
    }

    public void setFoodItem(fooditem foodItem) {
        this.foodItem = foodItem;
    }

    public User getReceiver() {
        return receiver;
    }

    public void setReceiver(User receiver) {
        this.receiver = receiver;
    }

    public LocalDateTime getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(LocalDateTime requestDate) {
        this.requestDate = requestDate;
    }
}
