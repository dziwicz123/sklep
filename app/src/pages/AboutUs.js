import React from "react";
import { Container, Box, Typography } from "@mui/material";
import AppNavbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutUs = () => {
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
                            O nas
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Witamy w sklepie Elektronika, Twoim głównym miejscu do zakupu najnowszej elektroniki użytkowej. Jesteśmy dumni, że możemy dostarczyć szeroki wybór produktów wysokiej jakości, aby sprostać Twoim potrzebom technologicznym.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Nasza misja to zapewnienie naszym klientom najlepszych produktów i usług na rynku. Od smartfonów i laptopów po telewizory i akcesoria, dążymy do tego, aby zapewnić Ci najnowsze i najbardziej innowacyjne rozwiązania technologiczne.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Zespół Elektronika składa się z pasjonatów technologii, którzy zawsze są gotowi, aby pomóc Ci znaleźć idealny produkt. Nasz personel jest dobrze wyszkolony i zawsze gotowy do udzielenia profesjonalnych porad.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Dziękujemy, że wybrałeś Elektronika jako swojego zaufanego dostawcę elektroniki. Jesteśmy tutaj, aby służyć Ci najlepiej, jak potrafimy.
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Nasz zespół
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Składając się z ekspertów z różnych dziedzin technologii, nasz zespół ciężko pracuje, aby zapewnić Ci najlepsze produkty i obsługę. Niezależnie od tego, czy potrzebujesz porady technicznej, czy informacji o produkcie, jesteśmy tutaj, aby pomóc.
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Nasze wartości
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Jakość, innowacja, zaufanie i satysfakcja klienta są podstawą wszystkiego, co robimy. Jesteśmy zobowiązani do dostarczania produktów i usług, które przekraczają oczekiwania naszych klientów.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Zapraszamy do kontaktu z nami, jeśli masz jakiekolwiek pytania lub potrzebujesz pomocy. Jesteśmy tutaj, aby zapewnić Ci najlepsze doświadczenie zakupowe.
                        </Typography>
                    </Box>
                </Container>
            </Box>
            <Footer />
        </>
    );
};

export default AboutUs;
