import React from "react";
import { Container, Box, Typography } from "@mui/material";
import AppNavbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
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
                            Polityka prywatności
                        </Typography>
                        <Typography variant="body1" paragraph>
                            W Elektronika szanujemy Twoją prywatność i zobowiązujemy się do jej ochrony. Niniejsza Polityka prywatności wyjaśnia, jakie informacje zbieramy, jak je wykorzystujemy oraz jakie masz prawa w związku z danymi osobowymi.
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            1. Informacje, które zbieramy
                        </Typography>
                        <Typography variant="body1" paragraph>
                            1.1. Zbieramy informacje, które nam podajesz bezpośrednio, takie jak imię, nazwisko, adres e-mail, numer telefonu oraz adres do wysyłki podczas rejestracji konta lub dokonywania zakupów.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            1.2. Automatycznie zbieramy pewne informacje, gdy odwiedzasz naszą stronę, w tym adres IP, typ przeglądarki, ustawienia językowe, czas dostępu i odnośny adres URL.
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            2. Jak wykorzystujemy Twoje informacje
                        </Typography>
                        <Typography variant="body1" paragraph>
                            2.1. Wykorzystujemy Twoje informacje do przetwarzania zamówień, dostarczania produktów, obsługi klienta oraz komunikacji z Tobą w sprawie zamówień i naszych usług.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            2.2. Możemy również używać Twoich informacji do wysyłania Ci wiadomości marketingowych, które mogą Cię zainteresować, pod warunkiem że wyraziłeś na to zgodę.
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            3. Ochrona danych
                        </Typography>
                        <Typography variant="body1" paragraph>
                            3.1. Stosujemy odpowiednie środki techniczne i organizacyjne, aby chronić Twoje dane przed nieautoryzowanym dostępem, utratą, zniszczeniem lub modyfikacją.
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            4. Twoje prawa
                        </Typography>
                        <Typography variant="body1" paragraph>
                            4.1. Masz prawo do dostępu, poprawiania, usuwania oraz ograniczenia przetwarzania Twoich danych osobowych. Możesz również wycofać swoją zgodę na przetwarzanie danych osobowych w dowolnym momencie.
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            5. Kontakt
                        </Typography>
                        <Typography variant="body1" paragraph>
                            5.1. Jeśli masz jakiekolwiek pytania dotyczące naszej Polityki prywatności lub chcesz skorzystać ze swoich praw, skontaktuj się z nami:
                        </Typography>
                        <Typography variant="body1" paragraph>
                            <strong>Adres:</strong> Elektronika 123, Miasto Łódź
                        </Typography>
                        <Typography variant="body1" paragraph>
                            <strong>Email:</strong> privacy@electronics.com
                        </Typography>
                        <Typography variant="body1" paragraph>
                            <strong>Telefon:</strong> +48 800 123 456
                        </Typography>
                    </Box>
                </Container>
            </Box>
            <Footer />
        </>
    );
};

export default PrivacyPolicy;
