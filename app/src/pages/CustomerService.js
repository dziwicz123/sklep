import React from "react";
import { Container, Box, Typography } from "@mui/material";
import AppNavbar from "../components/Navbar";
import Footer from "../components/Footer";

const CustomerService = () => {
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
                            Obsługa klienta
                        </Typography>
                        <Typography variant="body1" paragraph>
                            W Elektronika zależy nam na zapewnieniu najwyższej jakości obsługi klienta. Nasz zespół jest gotowy, aby pomóc Ci w każdej sprawie związanej z naszymi produktami i usługami.
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Kontakt z nami
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Jeśli masz jakiekolwiek pytania lub potrzebujesz pomocy, skontaktuj się z nami:
                        </Typography>
                        <Typography variant="body1" paragraph>
                            <strong>Adres:</strong> Elektronika 123, Miasto Łódź
                        </Typography>
                        <Typography variant="body1" paragraph>
                            <strong>Email:</strong> support@electronics.com
                        </Typography>
                        <Typography variant="body1" paragraph>
                            <strong>Telefon:</strong> +48 800 123 456
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Godziny pracy
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Nasz zespół jest dostępny od poniedziałku do piątku w godzinach 9:00 - 18:00. W soboty pracujemy w godzinach 10:00 - 14:00. W niedziele i święta jesteśmy zamknięci.
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Często zadawane pytania (FAQ)
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Znajdź odpowiedzi na najczęściej zadawane pytania w naszym dziale FAQ. Jeśli nie znajdziesz odpowiedzi, której szukasz, skontaktuj się z nami bezpośrednio.
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Zwroty i reklamacje
                        </Typography>
                        <Typography variant="body1" paragraph>
                            W przypadku potrzeby zwrotu lub reklamacji produktu, prosimy o kontakt z naszym działem obsługi klienta. Zapewniamy szybką i sprawną procedurę zwrotu lub wymiany towaru.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Dziękujemy, że wybrałeś Elektronika. Jesteśmy tutaj, aby zapewnić Ci najlepsze doświadczenie zakupowe.
                        </Typography>
                    </Box>
                </Container>
            </Box>
            <Footer />
        </>
    );
};

export default CustomerService;
