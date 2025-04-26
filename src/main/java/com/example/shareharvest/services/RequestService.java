package com.example.shareharvest.services;
import com.example.shareharvest.models.Request;
import com.example.shareharvest.models.User;
import com.example.shareharvest.models.fooditem;
import com.example.shareharvest.repository.FoodItemRepository;
import com.example.shareharvest.repository.requestrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RequestService {
    @Autowired
    public requestrepo requestRepository;

    @Autowired
    private FoodItemRepository foodItemRepository;

    @Autowired
    private FoodItemService foodItemService;

    public Request createRequest(Request request) throws Exception {
        Optional<fooditem> foodItemOpt = foodItemRepository.findById(request.getFoodItem().getId());
        if (foodItemOpt.isEmpty() || !foodItemOpt.get().isAvailable()) {
            throw new Exception("Food item not available");
        }
        return requestRepository.save(request);
    }

    public List<Request> getRequestsByReceiver(User receiver) {
        return requestRepository.findByReceiver(receiver);
    }

    public List<Request> getRequestsByDonor(User donor) {
        return requestRepository.findByFoodItem_Donor(donor);
    }

    public Request updateRequestStatus(Long requestId, String status) throws Exception {
        Optional<Request> requestOpt = requestRepository.findById(requestId);
        if (requestOpt.isEmpty()) {
            throw new Exception("Request not found");
        }
        Request request = requestOpt.get();
        request.setStatus(status);
        if (status.equals("ACCEPTED")) {
            foodItemService.markAsUnavailable(request.getFoodItem().getId());
        }
        return requestRepository.save(request);
    }
}