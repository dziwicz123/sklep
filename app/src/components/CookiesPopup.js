import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const CookiesPopup = () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const isPopupShown = sessionStorage.getItem('cookiesPopupShown');
        if (!isPopupShown) {
            setOpen(true);
        }
    }, []);

    const handleAccept = () => {
        setOpen(false);
        sessionStorage.setItem('cookiesPopupShown', 'true');
    };

    const handleDecline = () => {
        setOpen(false);
        sessionStorage.setItem('cookiesPopupShown', 'true');
    };

    return (
        <Dialog
            open={open}
            onClose={handleDecline}
            aria-labelledby="cookies-dialog-title"
            aria-describedby="cookies-dialog-description"
            PaperProps={{
                style: {
                    borderRadius: '20px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                },
            }}
        >
            <DialogTitle
                id="cookies-dialog-title"
                style={{
                    textAlign: 'center',
                    fontSize: '1.8rem',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    padding: '20px',
                    borderRadius: '20px 20px 0 0',
                }}
            >
                Polityka Cookies
            </DialogTitle>
            <DialogContent style={{ padding: '20px' }}>
                <DialogContentText
                    id="cookies-dialog-description"
                    style={{
                        fontSize: '1rem',
                        textAlign: 'center',
                    }}
                >
                    Ta strona używa plików cookies, aby zapewnić najlepsze wrażenia na naszej stronie.
                </DialogContentText>
            </DialogContent>
            <DialogActions style={{ justifyContent: 'center', padding: '10px 20px 20px' }}>
                <Button
                    onClick={handleDecline}
                    style={{
                        color: '#4CAF50',
                        borderColor: '#4CAF50',
                        marginRight: '10px',
                        padding: '10px 20px',
                        borderRadius: '20px',
                    }}
                    variant="outlined"
                >
                    Akceptuję tylko wymagane
                </Button>
                <Button
                    onClick={handleAccept}
                    style={{
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '20px',
                    }}
                    variant="contained"
                >
                    Akceptuję wszystkie
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CookiesPopup;
