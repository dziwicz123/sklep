package com.example.shop.repo;

import com.example.shop.model.Basket;
import com.example.shop.model.OrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Long> {
    OrderDetails findByBasket(Basket basket);
}
