import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TablePagination,
    Box,
    Toolbar,
    InputAdornment,
    TextField,
    IconButton,
    TableSortLabel
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

function Products() {
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [search, setSearch] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/products', { withCredentials: true });
                const sortedData = sortData(response.data, 'asc');
                setProducts(sortedData);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const sortData = (data, order) => {
        return data.sort((a, b) => {
            if (order === 'asc') {
                return a.id - b.id;
            } else {
                return b.id - a.id;
            }
        });
    };

    const handleSort = () => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        const sortedData = sortData([...products], newSortOrder);
        setSortOrder(newSortOrder);
        setProducts(sortedData);
    };

    const handleClickOpen = (product) => {
        setSelectedProduct(product);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedProduct(null);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8081/api/products/${selectedProduct.id}`, { withCredentials: true });
            setProducts(products.filter(product => product.id !== selectedProduct.id));
            handleClose();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const filteredProducts = products.filter(product =>
        product.productName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Container>
            <Toolbar>
                <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                    Produkty
                </Typography>
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Szukaj produktu"
                    value={search}
                    onChange={handleSearchChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Toolbar>
            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell sortDirection={sortOrder}>
                                <TableSortLabel
                                    active={true}
                                    direction={sortOrder}
                                    onClick={handleSort}
                                >
                                    ID
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>Nazwa produktu</TableCell>
                            <TableCell>Kategoria</TableCell>
                            <TableCell>Opis</TableCell>
                            <TableCell>Cena</TableCell>
                            <TableCell>Cena promocyjna</TableCell>
                            <TableCell>Akcje</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.id}</TableCell>
                                <TableCell>{product.productName}</TableCell>
                                <TableCell>{product.category?.categoryName}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.cutPrice}</TableCell>
                                <TableCell>
                                    <IconButton color="secondary" onClick={() => handleClickOpen(product)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Box display="flex" justifyContent="center" m={2}>
                    <TablePagination
                        rowsPerPageOptions={[10, 20, 30]}
                        component="div"
                        count={filteredProducts.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        sx={{
                            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                                margin: 0,
                                fontSize: '0.875rem',
                            },
                            '& .MuiTablePagination-toolbar': {
                                paddingLeft: 2,
                                paddingRight: 2,
                            },
                            '& .MuiTablePagination-actions': {
                                marginLeft: 1,
                            },
                        }}
                    />
                </Box>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Usuń produkt</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Czy na pewno chcesz usunąć produkt {selectedProduct?.productName}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Anuluj
                    </Button>
                    <Button onClick={handleDelete} color="secondary">
                        Usuń
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default Products;
