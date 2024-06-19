import React from "react";
import { Container, Box, Typography } from "@mui/material";
import AppNavbar from "../components/Navbar";
import Footer from "../components/Footer";

const Terms = () => {
    return (
        <>
            <AppNavbar />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    py: 3,
                    marginTop: 3,
                    marginBottom: 3,
                    borderRadius: 7,
                    width: "100%",
                }}
            >
                <Container maxWidth="md">
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="flex-start"
                        p={3}
                        boxShadow={3}
                        borderRadius={2}
                        bgcolor="white"
                        sx={{ padding: 3 }}
                    >
                        <Typography variant="h4" gutterBottom>
                            Regulamin
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Witamy w naszym sklepie internetowym. Niniejszy Regulamin określa zasady korzystania z naszego serwisu.
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            1. Postanowienia ogólne
                        </Typography>
                        <Typography variant="body1" paragraph>
                            1.1. Niniejszy Regulamin określa zasady korzystania ze sklepu internetowego dostępnego pod adresem www.electronics.com.
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            2. Definicje
                        </Typography>
                        <Typography variant="body1" paragraph>
                            2.1. Sklep - sklep internetowy dostępny pod adresem www.electronics.com, prowadzony przez Sprzedawcę.
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            3. Zasady korzystania ze Sklepu
                        </Typography>
                        <Typography variant="body1" paragraph>
                            3.1. Warunkiem rozpoczęcia korzystania ze Sklepu jest rejestracja w jego ramach.
                        </Typography>
                        {/* Add more sections as needed */}
                    </Box>
                </Container>
            </Box>
            <Footer />
        </>
    );
};

export default Terms;