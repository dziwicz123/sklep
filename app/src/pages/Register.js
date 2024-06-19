import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import Button from "@mui/material/Button";
import AppNavbar from "../components/Navbar";  // Import Navbar
import Footer from "../components/Footer";  // Import Footer
import "../styles/Register.css";

function Register() {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      try {
        const response = await fetch("http://localhost:8081/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          const userData = await response.json();
          console.log("User registered successfully:", userData);

          // Now perform login after registration
          const loginResponse = await fetch("http://localhost:8081/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password,
            }),
          });

          if (loginResponse.ok) {
            const loginData = await loginResponse.json();
            console.log("Login response:", loginData);

            if (loginData.status && loginData.user) {
              console.log("Storing user data to sessionStorage:", loginData.user);
              sessionStorage.setItem('user', JSON.stringify(loginData.user)); // Store user information in sessionStorage
              console.log("User logged in successfully:", loginData);

              // Save the user's basket with state = false to sessionStorage
              const basket = loginData.user.baskets.find(basket => basket.state === false);
              if (basket) {
                sessionStorage.setItem('basket', JSON.stringify(basket));
              }

              navigate("/"); // Redirect to HomePage
            } else {
              console.error("Failed to log in:", loginData.message);
              // Handle error, e.g., display an error message to the user
            }
          } else {
            console.error("Failed to log in:", loginResponse.statusText);
            // Handle error
          }
        } else {
          console.error("Failed to register user:", response.statusText);
          // Handle error, e.g., display an error message to the user
        }
      } catch (error) {
        console.error("Error registering user:", error);
        // Handle connection error or other errors
      }
      setValidated(true);
    }
    setValidated(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
      <>
        <AppNavbar />
        <Container fluid>
          <Row className="justify-content-center align-items-center h-100">
            <Col xs={12}>
              <Card
                  className="bg-custom text-dark my-5 mx-auto"
                  style={{ borderRadius: "1rem", maxWidth: "600px" }}
              >
                <Card.Body className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                  <h2 className="fw-bold mb-2 text-uppercase">Zarejestruj się</h2>
                  <Form
                      noValidate
                      validated={validated}
                      onSubmit={handleSubmit}
                      className="w-100"
                  >
                    <Form.Group className="mb-3" controlId="formFirstName">
                      <Form.Label className={`text-dark ${formData.name ? "label-visible" : "label-fade"}`}>
                        Imię
                      </Form.Label>
                      <Form.Control
                          type="text"
                          placeholder="Imię"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          size="lg"
                      />
                      <Form.Control.Feedback type="invalid">
                        Imię jest wymagane
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formLastName">
                      <Form.Label className={`text-dark ${formData.lastName ? "label-visible" : "label-fade"}`}>
                        Nazwisko
                      </Form.Label>
                      <Form.Control
                          type="text"
                          placeholder="Nazwisko"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          size="lg"
                      />
                      <Form.Control.Feedback type="invalid">
                        Nazwisko jest wymagane
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label className={`text-dark ${formData.email ? "label-visible" : "label-fade"}`}>
                        Email
                      </Form.Label>
                      <Form.Control
                          type="email"
                          placeholder="Email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          size="lg"
                      />
                      <Form.Control.Feedback type="invalid">
                        Podaj prawidłowy adres email
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPhone">
                      <Form.Label className={`text-dark ${formData.phone ? "label-visible" : "label-fade"}`}>
                        Telefon
                      </Form.Label>
                      <Form.Control
                          type="tel"
                          placeholder="Numer Telefonu"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          pattern="^\d{9}$"
                          size="lg"
                      />
                      <Form.Control.Feedback type="invalid">
                        Numer telefonu musi mieć 9 cyfr
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPassword">
                      <Form.Label className={`text-dark ${formData.password ? "label-visible" : "label-fade"}`}>
                        Hasło
                      </Form.Label>
                      <Form.Control
                          type="password"
                          placeholder="Hasło"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          size="lg"
                      />
                      <Form.Control.Feedback type="invalid">
                        Hasło jest wymagane
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formConfirmPassword">
                      <Form.Label className={`text-dark ${formData.confirmPassword ? "label-visible" : "label-fade"}`}>
                        Potwierdź hasło
                      </Form.Label>
                      <Form.Control
                          type="password"
                          placeholder="Potwierdź hasło"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                          pattern={formData.password}
                          size="lg"
                      />
                      <Form.Control.Feedback type="invalid">
                        Hasła muszą być takie same
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Row className="d-grid gap-2 col-6 mx-auto" style={{ marginTop: "2rem" }}>
                      <Button
                          type="submit"
                          sx={{
                            color: "#FFFFFF",
                            borderRadius: "4px",
                            border: "1px solid #FFFFFF",
                            fontSize: "1rem",
                            backgroundColor: "#007bff",
                            "&:hover": {
                              backgroundColor: "#0056b3",
                            },
                          }}
                      >
                        Zarejestruj się
                      </Button>
                    </Row>
                  </Form>
                  <div className="text-center pt-3">
                    <p className="mb-0">
                      Masz już konto{" "}
                      <Link to="/login" className="text-dark-50 fw-bold">
                        Zaloguj się
                      </Link>
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <Footer />
      </>
  );
}

export default Register;
