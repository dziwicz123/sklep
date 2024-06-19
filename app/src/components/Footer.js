import React from "react";
import { Container, Grid, Box, Typography, Link } from "@mui/material";
import { Facebook, Twitter, Instagram, YouTube } from "@mui/icons-material";

const Footer = () => {
  return (
      <Box
          sx={{
            width: '100%',
            backgroundColor: '#2C3E50',
            color: 'white',
            py: 3,
          }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom>
                Elektronika
              </Typography>
              <Typography variant="body2" sx={{ lineHeight: 2 }}>
                Twoje miejsce na najwyższej jakości elektronikę i akcesoria. Oferujemy szeroki wybór produktów, aby zaspokoić wszystkie Twoje potrzeby technologiczne.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom>
                Produkty
              </Typography>
              <Link href="/category/1" color="inherit" variant="body2" display="block" underline="none" sx={{ lineHeight: 2 }}>
                Laptopy i komputery
              </Link>
              <Link href="/category/2" color="inherit" variant="body2" display="block" underline="none" sx={{ lineHeight: 2 }}>
                Smartfony
              </Link>
              <Link href="/category/3" color="inherit" variant="body2" display="block" underline="none" sx={{ lineHeight: 2 }}>
                Monitory
              </Link>
              <Link href="/category/4" color="inherit" variant="body2" display="block" underline="none" sx={{ lineHeight: 2 }}>
                Smartwatche
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom>
                Przydatne Linki
              </Typography>
              <Link href="/aboutas" color="inherit" variant="body2" display="block" underline="none" sx={{ lineHeight: 2 }}>
                O nas
              </Link>
              <Link href="/customerservice" color="inherit" variant="body2" display="block" underline="none" sx={{ lineHeight: 2 }}>
                Obsługa klienta
              </Link>
              <Link href="/terms" color="inherit" variant="body2" display="block" underline="none" sx={{ lineHeight: 2 }}>
                Regulamin
              </Link>
              <Link href="PrivacyPolicy" color="inherit" variant="body2" display="block" underline="none" sx={{ lineHeight: 2 }}>
                Polityka prywatności
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom>
                Kontakt
              </Typography>
              <Typography variant="body2" display="block" sx={{ lineHeight: 2 }}>
                Adres: Elektronika 123, Miasto Łódź
              </Typography>
              <Typography variant="body2" display="block" sx={{ lineHeight: 2 }}>
                Email: support@electronics.com
              </Typography>
              <Typography variant="body2" display="block" sx={{ lineHeight: 2 }}>
                Telefon: +48 800 123 456
              </Typography>
              <Box mt={2}>
                <Link href="#" color="inherit" underline="none" sx={{ mr: 1 }}>
                  <Facebook />
                </Link>
                <Link href="#" color="inherit" underline="none" sx={{ mr: 1 }}>
                  <Twitter />
                </Link>
                <Link href="#" color="inherit" underline="none" sx={{ mr: 1 }}>
                  <Instagram />
                </Link>
                <Link href="#" color="inherit" underline="none" sx={{ mr: 1 }}>
                  <YouTube />
                </Link>
              </Box>
            </Grid>
          </Grid>
          <Box textAlign="center" mt={4}>
            <Typography variant="body2" sx={{ lineHeight: 2 }}>
              &copy; {new Date().getFullYear()} Elektronika. Wszelkie prawa zastrzeżone.
            </Typography>
          </Box>
        </Container>
      </Box>
  );
};

export default Footer;
