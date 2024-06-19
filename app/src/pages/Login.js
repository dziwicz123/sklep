import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import Button from "@mui/material/Button";
import AppNavbar from "../components/Navbar";  // Import Navbar
import Footer from "../components/Footer";  // Import Footer
import "../styles/Login.css";

function Login() {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      return;
    }

    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:8081/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const res = await response.json();
      if (response.ok && res.status && res.user) {
        sessionStorage.setItem('user', JSON.stringify(res.user));
        const basket = res.user.baskets.find(basket => basket && basket.state === false);
        if (basket) {
          sessionStorage.setItem('basket', JSON.stringify(basket));
        }

        if(res.user.userType === 'ADMIN'){
          navigate("/admin");
        }
        else {
          navigate("/");
        }

      } else {
        setErrorMessage(res.message || "Failed to log in. Please try again.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("An error occurred while trying to log in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <>
        <AppNavbar />
        <Container fluid>
          <Row className="justify-content-center align-items-center h-100">
            <Col xs={12}>
              <Card
                  className="bg-custom text-dark my-5 mx-auto"
                  style={{ borderRadius: "1rem", maxWidth: "400px" }}
              >
                <Card.Body className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                  <h2 className="fw-bold mb-2 text-uppercase">Zaloguj się</h2>

                  {errorMessage && <p className="text-danger">{errorMessage}</p>}

                  <Form noValidate validated={validated} onSubmit={handleSubmit} className="w-100">
                    <Form.Group className="mb-4" controlId="formEmail">
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
                          className="mdb-input"
                      />
                      <Form.Control.Feedback type="invalid">
                        Podaj prawidłowy adres email.
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formPassword">
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
                          className="mdb-input"
                      />
                      <Form.Control.Feedback type="invalid">
                        Hasło jest wymagane.
                      </Form.Control.Feedback>
                    </Form.Group>
                    <div className="d-grid gap-2 col-6 mx-auto">
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
                          disabled={isLoading}
                      >
                        {isLoading ? "Logging in..." : "Zaloguj się"}
                      </Button>
                    </div>
                  </Form>
                  <div style={{ textAlign: "center", marginTop: "1rem" }}>
                    <p className="mb-0">
                      Nie masz konta{" "}
                      <Link to="/register" className="text-dark-50 fw-bold">
                        Zarejestruj się
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

export default Login;
