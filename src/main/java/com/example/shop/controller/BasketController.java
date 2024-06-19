package com.example.shop.controller;

import com.example.shop.model.Basket;
import com.example.shop.model.Product;
import com.example.shop.model.User;
import com.example.shop.repo.BasketRepository;
import com.example.shop.repo.ProductRepository;
import com.example.shop.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/basket")
public class BasketController {

    @Autowired
    private BasketRepository basketRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/add")
    public ResponseEntity<?> createBasket(Principal principal) {
        String email = principal.getName();
        User user = userRepository.findByEmail(email);

        if (user == null) {
            return ResponseEntity.status(401).body("User not authenticated");
        }

        // Create a new basket and assign it to the user
        Basket basket = new Basket();
        basket.setUser(user);
        basket.setState(false);
        basket.setTotalPrice(0.0f);
        basketRepository.save(basket);

        return ResponseEntity.ok(basket);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Basket> getUserNewBasket(@PathVariable Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (!userOptional.isPresent()) {
            return ResponseEntity.status(404).body(null);
        }

        User user = userOptional.get();
        Basket newBasket = basketRepository.findByUserAndState(user, false);

        if (newBasket == null) {
            return ResponseEntity.status(404).body(null);
        }

        return ResponseEntity.ok(newBasket);
    }


}
