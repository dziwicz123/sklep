import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardMedia,
  Grid,
  Container,
  Paper,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AppNavbar from "../components/Navbar";
import AppFooter from "../components/Footer";
import axios from "axios";
import { useParams } from "react-router-dom";
import AddToCart from "../components/AddToCart";

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`http://localhost:8081/api/products/${productId}`);
          setProduct(response.data);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      };

      fetchProduct();
    } else {
      console.error("Product ID is undefined");
    }
  }, [productId]);

  const handleChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    const cartProduct = {
      ...product,
      quantity: quantity,
    };

    const existingProductIndex = cart.findIndex((item) => item.id === product.id);

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += quantity;
    } else {
      cart.push(cartProduct);
    }

    sessionStorage.setItem("cart", JSON.stringify(cart));
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  const formattedDescription = product.description.replace(/\\r\\n|\\n/g, "\n");
  const descriptionLines = formattedDescription.split("\n");

  return (
      <>
        <AppNavbar />
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <Container
              maxWidth="lg"
              sx={{
                py: 3,
                marginTop: 3,
                flexGrow: 1,
                borderRadius: 4,
                backgroundColor: "#E2F3F7",
                marginBottom: 2,
              }}
          >
            <Grid container spacing={4} alignItems="flex-start">
              <Grid item xs={12} md={4}>
                <Card elevation={3} sx={{  boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
                  <CardMedia
                      component="img"
                      image={product.image}
                      alt={product.productName}
                      sx={{ width: "100%", height: "auto", padding: 2 }}
                  />
                </Card>
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant="h4" gutterBottom component="div" sx={{ mt: 2, mb: 2, textAlign: "center" }}>
                  {product.productName}
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={8}>
                    <Paper elevation={2} sx={{ p: 2, height: "100%", backgroundColor: "#E2F3F7" }}>
                      {product.cutPrice && (
                          <Typography sx={{ color: "green", fontWeight: "bold", textAlign: "center" }} gutterBottom>
                            Oszczędzasz {product.price - product.cutPrice} zł
                          </Typography>
                      )}
                      <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center" }} gutterBottom>
                        {product.cutPrice ? product.cutPrice : product.price} zł
                      </Typography>
                      <Box sx={{ mt: 2, display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <FormControl size="small" sx={{ width: "70px", mr: 1 }}>
                          <Select labelId="quantity-label" id="quantity" value={quantity} onChange={handleChange}>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={7}>7</MenuItem>
                          </Select>
                        </FormControl>
                        <Button
                            variant="contained"
                            color="success"
                            sx={{ flexGrow: 1 }}
                            startIcon={<ShoppingCartIcon />}
                            onClick={handleAddToCart}
                        >
                          Dodaj do koszyka
                        </Button>
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ mt: 4 }}>
              <Typography variant="h5" gutterBottom component="div" sx={{ textAlign: "center" }}>
                Opis Produktu:
              </Typography>
              <Paper elevation={2} sx={{ p: 2, backgroundColor: "white" }}>
                <Typography variant="body1" sx={{ textAlign: "center" }}>
                  {descriptionLines.map((line, index) => (
                      <span key={index}>
                    {line}
                        <br />
                  </span>
                  ))}
                </Typography>
              </Paper>
            </Grid>
          </Container>
          <AddToCart open={openModal} handleClose={handleCloseModal} />
          <AppFooter />
        </Box>
      </>
  );
};

export default ProductPage;
