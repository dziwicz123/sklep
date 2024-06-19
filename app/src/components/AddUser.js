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

const AddUser = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation
    if (password !== confirmPassword) {
      setError('Hasła nie są takie same');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8081/api/register', {
        name: firstName,
        lastName: lastName,
        email: email,
        phone: phoneNumber,
        password: password
      });

      if (response.status === 200) {
        setSuccess('Dodano użytkownika');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhoneNumber('');
        setPassword('');
        setConfirmPassword('');
        setError(null);
      }
    } catch (error) {
      setError('Błąd dodawania użytkownika: ' + (error.response?.data?.message || error.message));
      setSuccess(null);
    }
  };

  return (
      <StyledContainer maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Dodaj użytkownika
        </Typography>
        {error && <Alert severity="error" sx={{ marginBottom: '1rem' }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ marginBottom: '1rem' }}>{success}</Alert>}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <StyledTextField
                  label="Imię"
                  fullWidth
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                  label="Nazwisko"
                  fullWidth
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                  label="Email"
                  fullWidth
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                  label="Numer telefonu"
                  fullWidth
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                  label="Hasło"
                  fullWidth
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                  label="Potwierdź hasło"
                  fullWidth
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Dodaj użytkownika
              </Button>
            </Grid>
          </Grid>
        </form>
      </StyledContainer>
  );
};

export default AddUser;
