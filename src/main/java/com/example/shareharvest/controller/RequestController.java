package com.example.shareharvest.controller;
import com.example.shareharvest.models.Request;
import com.example.shareharvest.models.User;
import com.example.shareharvest.services.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
public class RequestController {
    @Autowired
    private RequestService requestService;

    @PostMapping
    public ResponseEntity<?> createRequest(@RequestBody Request request) {
        try {
            Request newRequest = requestService.createRequest(request);
            return ResponseEntity.ok(newRequest);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/receiver/{receiverId}")
    public List<Request> getRequestsByReceiver(@PathVariable Long receiverId) {
        User receiver = new User();
        receiver.setId(receiverId);
        return requestService.getRequestsByReceiver(receiver);
    }

    @GetMapping("/donor/{donorId}")
    public List<Request> getRequestsByDonor(@PathVariable Long donorId) {
        User donor = new User();
        donor.setId(donorId);
        return requestService.getRequestsByDonor(donor);
    }

    @PutMapping("/{requestId}/status")
    public ResponseEntity<?> updateRequestStatus(@PathVariable Long requestId, @RequestBody String status) {
        try {
            Request updatedRequest = requestService.updateRequestStatus(requestId, status);
            return ResponseEntity.ok(updatedRequest);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}