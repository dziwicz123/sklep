import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from 'mdb-react-ui-kit';
import { Typography } from '@mui/material';

const CartZone = () => {
  const [items, setItems] = useState(() => {
    const storedItems = sessionStorage.getItem('cart');
    return storedItems ? JSON.parse(storedItems) : [];
  });

  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const handleQuantityChange = (id, newQuantity) => {
    setItems(
        items.map((item) =>
            item.id === id
                ? { ...item, quantity: newQuantity > 0 ? newQuantity : 1 }
                : item
        )
    );
  };

  const handleRemove = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleDelivery = () => {
    if (items.length === 0) {
      alert(
          'Your cart is empty. Please add items to your cart before proceeding to delivery.'
      );
      return;
    }
    const user = sessionStorage.getItem('user');
    if (user) {
      navigate('/delivery');
    } else {
      navigate('/login');
    }
  };

  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  const totalPrice = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
  );
  const productText = itemCount === 1 ? 'produkt' : 'produkty';

  return (
      <section className="h-100 h-custom" style={{  marginBottom: '20px' }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol>
              <MDBCard>
                <MDBCardBody className="p-4">
                  <MDBRow>
                    <MDBCol lg="7">
                      <MDBTypography tag="h5">
                        <Link to="/" className="text-body">
                          <MDBIcon fas icon="long-arrow-alt-left me-2" /> Kontynuuj zakupy
                        </Link>
                      </MDBTypography>

                      <hr />

                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                          <p className="mb-1">Koszyk</p>
                          <p className="mb-0">
                            Masz {itemCount} {productText} w koszyku
                          </p>
                        </div>
                      </div>

                      {items.length > 0 ? (
                          items.map((item) => (
                              <MDBCard className="mb-3" key={item.id}>
                                <MDBCardBody>
                                  <div className="d-flex justify-content-between">
                                    <div className="d-flex flex-row align-items-center">
                                      <div>
                                        <MDBCardImage
                                            src={item.image}
                                            fluid
                                            className="rounded-3"
                                            style={{ width: '120px' }} // Enlarged image
                                            alt={item.productName}
                                        />
                                      </div>
                                      <div className="ms-3">
                                        <MDBTypography tag="h5">
                                          {item.productName}
                                        </MDBTypography>
                                        <p className="small mb-0">
                                          {item.category.categoryName} {/* Displaying category name */}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="d-flex flex-row align-items-center">
                                      <div style={{ width: '50px' }}>
                                        <MDBTypography tag="h5" className="fw-normal mb-0">
                                          {item.quantity}
                                        </MDBTypography>
                                      </div>
                                      <div style={{ width: '80px' }}>
                                        <MDBTypography tag="h5" className="mb-0">
                                          {item.price} zł
                                        </MDBTypography>
                                      </div>
                                      <a href="#!" style={{ color: '#cecece' }} onClick={() => handleRemove(item.id)}>
                                        <MDBIcon fas icon="trash-alt" />
                                      </a>
                                    </div>
                                  </div>
                                </MDBCardBody>
                              </MDBCard>
                          ))
                      ) : (
                          <Typography variant="subtitle1">Twój koszyk jest pusty</Typography>
                      )}
                    </MDBCol>

                    <MDBCol lg="5">
                      <MDBCard className="bg-primary text-white rounded-3">
                        <MDBCardBody>
                          <div className="d-flex justify-content-between align-items-center mb-4">
                            <MDBTypography tag="h5" className="mb-0">
                              Podsumowanie
                            </MDBTypography>
                          </div>

                          <hr />

                          <div className="d-flex justify-content-between mb-4">
                            <MDBTypography tag="h5" className="text-uppercase">
                              Razem
                            </MDBTypography>
                            <MDBTypography tag="h5">
                              {totalPrice.toFixed(2)} zł
                            </MDBTypography>
                          </div>

                          <MDBBtn
                              color="info"
                              block
                              size="lg"
                              onClick={handleDelivery}
                              style={{ width: '100%' }} // Make the button full width
                          >
                            <div className="d-flex justify-content-between">
                              <span>{totalPrice.toFixed(2)} zł</span>
                              <span style={{ marginLeft: 'auto' }}>
                              Dostawa <i className="fas fa-long-arrow-alt-right ms-2"></i>
                            </span>
                            </div>
                          </MDBBtn>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
  );
};

export default CartZone;
