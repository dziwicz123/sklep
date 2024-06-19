package com.example.shop.controller;

import com.example.shop.DTO.CategoryProductsDTO;
import com.example.shop.model.Category;
import com.example.shop.model.Product;
import com.example.shop.service.CategoryService;
import com.example.shop.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/categories")
public class CategoryController {

    private static final Logger LOGGER = Logger.getLogger(CategoryController.class.getName());

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private ProductService productService;

    @GetMapping("/{categoryId}/products")
    public CategoryProductsDTO getProductsByCategory(@PathVariable Long categoryId) {
        try {
            List<Product> products = productService.getProductsByCategory(categoryId);
            Category category = categoryService.getCategoryById(categoryId);
            CategoryProductsDTO dto = new CategoryProductsDTO();
            dto.setCategoryName(category.getCategoryName());
            dto.setProducts(products);
            return dto;
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error fetching products for category ID: " + categoryId, e);
            throw e;
        }
    }

    @GetMapping
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }
}
