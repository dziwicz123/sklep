import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Container, Alert, Box } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';

const StyledContainer = styled(Container)({
  backgroundColor: '#f5f5f5',
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
});

const StyledTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    backgroundColor: '#ffffff',
  },
});

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [price, setPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const product = {
        productName,
        description,
        image: imagePath,
        price: parseFloat(price),
        cutPrice: parseFloat(salePrice),
        category: { id: parseInt(categoryId) }
      };
      const response = await axios.post('http://localhost:8081/api/products/add', product, { withCredentials: true });
      console.log('Product added:', response.data);
      setSuccess('Produkt dodany pomyślnie');
      setProductName('');
      setDescription('');
      setImagePath('');
      setPrice('');
      setSalePrice('');
      setCategoryId('');
      setError(null);
    } catch (error) {
      console.error('Error adding product:', error);
      setError('Błąd dodawania produktu: ' + (error.response?.data?.message || error.message));
      setSuccess(null);
    }
  };

  return (
      <StyledContainer maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Dodaj produkt
        </Typography>
        {error && <Alert severity="error" sx={{ marginBottom: '1rem' }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ marginBottom: '1rem' }}>{success}</Alert>}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <StyledTextField
                  label="Nazwa produktu"
                  fullWidth
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                  label="Opis"
                  fullWidth
                  multiline
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                  label="Ścieżka do zdjęcia"
                  fullWidth
                  value={imagePath}
                  onChange={(e) => setImagePath(e.target.value)}
                  variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                  label="Cena"
                  fullWidth
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                  label="Cena na promocji"
                  fullWidth
                  type="number"
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                  variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                  label="ID kategorii"
                  fullWidth
                  type="number"
                  inputProps={{ min: "1", max: "5" }}
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Dodaj produkt
              </Button>
            </Grid>
          </Grid>
        </form>
      </StyledContainer>
  );
};

export default AddProduct;
