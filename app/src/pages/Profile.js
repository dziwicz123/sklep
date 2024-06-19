import React, { useState, useEffect } from "react";
import { Container, CssBaseline, Typography, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import OrderSection from "../components/OrderSection";
import AppNavbar from "../components/Navbar";
import Footer from "../components/Footer";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userJson = sessionStorage.getItem("user");
    if (userJson) {
      setUser(JSON.parse(userJson));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("basket");
    navigate("/");
  };

  if (!user) {
    return null; // or a loading indicator
  }

  return (
      <>
        <AppNavbar />
        <CssBaseline />
        <Box sx={{ backgroundColor: "#007bff", minHeight: '100vh', py: 4 }}>
          <Container maxWidth="lg" sx={{ backgroundColor: 'transparent' }}>
            <Paper elevation={3} sx={{ padding: 3, backgroundColor: "#E2F3F7", marginBottom: 4}}>
              <Box mb={4}>
                <Typography variant="h4" gutterBottom>
                  Cześć, {user.name}
                </Typography>
                <OrderSection />
              </Box>
            </Paper>
          </Container>
        </Box>
        <Footer />
      </>
  );
};

export default Profile;
