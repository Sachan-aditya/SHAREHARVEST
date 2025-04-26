package com.example.shareharvest.models;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "food_items")
public class fooditem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;

    @Column(nullable = false)
    private String category; // e.g., Vegetables, Fruits

    @Column(nullable = false)
    private Integer quantity;

    @ManyToOne
    @JoinColumn(name = "donor_id", nullable = false)
    private User donor;

    private boolean available = true;

    // ✅ Manually declared getter and setter for 'available'
    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    // (Optional) Manually declare other getters/setters if you're not using Lombok
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public User getDonor() {
        return donor;
    }

    public void setDonor(User donor) {
        this.donor = donor;
    }

    public LocalDateTime getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(LocalDateTime expiryDate) {
        this.expiryDate = expiryDate;
    }

    private LocalDateTime expiryDate;
}
