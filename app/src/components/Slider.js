import React, { useEffect, useState } from 'react';
import {
    Box,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    Button,
    IconButton
} from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Slider = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [products, setProducts] = useState([]);
    const maxProducts = 5; // Set the maximum number of products to display

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/products');
                const allProducts = response.data;

                // Select 5 random products
                const randomProducts = [];
                while (randomProducts.length < maxProducts) {
                    const randomIndex = Math.floor(Math.random() * allProducts.length);
                    const randomProduct = allProducts[randomIndex];
                    if (!randomProducts.includes(randomProduct)) {
                        randomProducts.push(randomProduct);
                    }
                }
                setProducts(randomProducts);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleNext = () => {
        setActiveStep(prevActiveStep => (prevActiveStep + 1) % products.length);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => (prevActiveStep - 1 + products.length) % products.length);
    };

    const handleStepChange = step => {
        setActiveStep(step);
    };

    const handleImageClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    const addToCart = (product) => {
        let cart = JSON.parse(sessionStorage.getItem("cart") || "[]");
        const existingProduct = cart.find((p) => p.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            product.quantity = 1;
            cart.push(product);
        }

        sessionStorage.setItem("cart", JSON.stringify(cart));
    };

    return (
        <Box sx={{ position: 'relative', width: '100%', mx: 'auto', borderRadius: '25px', backgroundColor: 'white', p: 2 }}>
            <Button
                onClick={handleBack}
                sx={{
                    position: 'absolute',
                    left: '-24px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 1,
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    minWidth: '48px',
                    height: '48px',
                    color: 'black',
                    boxShadow: 2,
                    '&:hover': {
                        backgroundColor: '#f0f0f0'
                    }
                }}
            >
                <KeyboardArrowLeft />
            </Button>

            <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {products.map((product, index) => (
                    <Box key={product.id} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Card
                            sx={{
                                position: "relative",
                                overflow: "hidden",
                                width: 600,
                                border: 'none',
                                boxShadow: 'none',
                            }}
                        >
                            <CardActionArea onClick={() => handleImageClick(product.id)}>
                                <CardMedia
                                    component="img"
                                    sx={{
                                        height: 400,
                                        width: 600,
                                        objectFit: "cover",
                                    }}
                                    image={product.image}
                                    alt={product.productName}
                                />
                            </CardActionArea>
                            <CardContent
                                sx={{
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
                                    onClick={() => addToCart(product)}
                                >
                                    <ShoppingBagIcon />
                                </Button>
                            </Box>
                        </Card>
                    </Box>
                ))}
            </AutoPlaySwipeableViews>

            <Button
                onClick={handleNext}
                sx={{
                    position: 'absolute',
                    right: '-24px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 1,
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    minWidth: '48px',
                    height: '48px',
                    color: 'black',
                    boxShadow: 2,
                    '&:hover': {
                        backgroundColor: '#f0f0f0'
                    }
                }}
            >
                <KeyboardArrowRight />
            </Button>
        </Box>
    );
}

export default Slider;
