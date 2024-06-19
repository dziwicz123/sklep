import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import AppNavbar from "../components/Navbar";
import Footer from "../components/Footer";

const Failure = () => {
    return (
        <>
            <AppNavbar />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "60vh",
                    py: 3,
                    marginTop: 3,
                    marginBottom: 3,
                    borderRadius: 2,
                }}
            >
                <Container maxWidth="sm" style={{ textAlign: "center" }}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        p={4}
                        boxShadow={4}
                        borderRadius={2}
                        bgcolor="white"
                    >
                        <ErrorIcon style={{ fontSize: 80, color: "red", marginBottom: 16 }} />
                        <Typography variant="h4" gutterBottom sx={{ color: "#d32f2f", fontWeight: 'bold' }}>
                            Płatność nie powiodła się!
                        </Typography>
                        <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>
                            Przepraszamy, ale wystąpił problem z Twoją transakcją. Prosimy spróbować ponownie.
                        </Typography>
                        <Button variant="contained" color="primary" href="/" sx={{ px: 4, py: 1.5 }}>
                            Powrót do strony głównej
                        </Button>
                    </Box>
                </Container>
            </Box>
            <Footer />
        </>
    );
};

export default Failure;
