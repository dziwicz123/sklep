import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddToCart = ({ open, handleClose }) => {
    const navigate = useNavigate();

    const handleViewCart = () => {
        handleClose();
        navigate("/cart");
    };

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="add-to-cart-dialog-title">
            <DialogTitle id="add-to-cart-dialog-title">Produkt dodany do koszyka</DialogTitle>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Kontynuuj zakupy
                </Button>
                <Button onClick={handleViewCart} color="primary">
                    Przejdź do koszyka
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddToCart;
