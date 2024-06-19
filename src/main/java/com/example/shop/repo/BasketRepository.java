package com.example.shop.repo;

import com.example.shop.model.Basket;
import com.example.shop.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BasketRepository extends JpaRepository<Basket, Long> {
    Basket findByUserAndState(User user, Boolean state);
}
