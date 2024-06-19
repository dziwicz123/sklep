import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    Button,
    Box,
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AddToCart from "./AddToCart";

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const handleImageClick = () => {
        navigate(`/product/${product.id}`);
    };

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const addToCart = () => {
        let cart = JSON.parse(sessionStorage.getItem("cart") || "[]");
        const existingProduct = cart.find((p) => p.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            product.quantity = 1;
            cart.push(product);
        }

        sessionStorage.setItem("cart", JSON.stringify(cart));
        handleOpen();
    };

    return (
        <>
            <Card
                elevation={1}
                sx={{
                    position: "relative",
                    overflow: "hidden",
                    transition: "elevation 0.3s",
                    ":hover": {
                        boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
                    },
                }}
            >
                <CardActionArea onClick={handleImageClick}>
                    <CardMedia
                        component="img"
                        sx={{
                            height: 150,
                            width: 1,
                            objectFit: "contain",
                        }}
                        image={product.image}
                        alt={product.productName}
                    />
                </CardActionArea>
                <CardContent
                    sx={{
                        height: 200,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography
                        gutterBottom
                        variant="body1"
                        component="div"
                        sx={{
                            textAlign: "left",
                            hyphens: "auto",
                            wordBreak: "break-word",
                            overflowWrap: "break-word",
                            fontSize: "1rem",
                            fontWeight: "bold",
                        }}
                    >
                        {product.productName}
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            mt: 1,
                        }}
                    >
                        {product.cutPrice && (
                            <Typography
                                variant="body2"
                                component="div"
                                sx={{
                                    textDecoration: "line-through",
                                    color: "red",
                                    marginRight: "10px",
                                }}
                            >
                                {product.price} zł
                            </Typography>
                        )}
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                fontWeight: "bold",
                                color: product.cutPrice ? "green" : "inherit",
                            }}
                        >
                            {product.cutPrice ? product.cutPrice + " zł" : product.price + " zł"}
                        </Typography>
                    </Box>
                </CardContent>
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 16,
                        right: 16,
                        zIndex: 1000,
                    }}
                >
                    <Button
                        variant="outlined"
                        sx={{
                            borderColor: "#ff4081",
                            borderWidth: 2,
                            color: "#ff4081",
                            "&:hover": {
                                backgroundColor: "#ff4081",
                                color: "white",
                                borderColor: "#ff4081",
                            },
                        }}
                        size="small"
                        onClick={addToCart}
                    >
                        <ShoppingBagIcon />
                    </Button>
                </Box>
            </Card>
            <AddToCart open={open} handleClose={handleClose} />
        </>
    );
};

export default ProductCard;
