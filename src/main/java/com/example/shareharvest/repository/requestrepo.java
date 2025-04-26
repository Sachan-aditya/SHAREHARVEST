package com.example.shareharvest.repository;
import com.example.shareharvest.models.Request;
import com.example.shareharvest.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface requestrepo extends JpaRepository<Request, Long> {
    List<Request> findByReceiver(User receiver);
    List<Request> findByFoodItem_Donor(User donor);
}