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
    Select,
    MenuItem,
    TableSortLabel,
    Toolbar,
    InputAdornment,
    TextField,
    TablePagination, Box
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [editingStatus, setEditingStatus] = useState({});
    const [sortOrder, setSortOrder] = useState('asc');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/order/all', { withCredentials: true });
                const sortedData = sortData(response.data, 'asc');
                setOrders(sortedData);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const sortData = (data, order) => {
        return data.sort((a, b) => {
            if (!a.basket || !b.basket) return 0;
            if (order === 'asc') {
                return a.basket.id - b.basket.id;
            } else {
                return b.basket.id - a.basket.id;
            }
        });
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSort = () => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        const sortedData = sortData([...orders], newSortOrder);
        setSortOrder(newSortOrder);
        setOrders(sortedData);
    };

    const handleStatusChange = async (id, newState) => {
        try {
            const response = await axios.patch(
                `http://localhost:8081/api/order/update/${id}`,
                { state: newState }, // Updated payload format
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );
            setOrders(orders.map(order => (order.id === id ? response.data : order)));
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    const handleSelectChange = (id, event) => {
        const newState = event.target.value;
        setEditingStatus({ ...editingStatus, [id]: newState });
        handleStatusChange(id, newState);
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const filteredOrders = orders.filter(order =>
        (order.basket?.id?.toString().includes(search) || '') ||
        (order.basket?.totalPrice?.toString().includes(search) || '') ||
        (order.orderDate.toLowerCase().includes(search.toLowerCase()) || '') ||
        (order.shipDate && order.shipDate.toLowerCase().includes(search.toLowerCase())) ||
        (order.state.toLowerCase().includes(search.toLowerCase()) || '') ||
        (order.type.toLowerCase().includes(search.toLowerCase()) || '')
    );

    return (
        <Container>
            <Toolbar>
                <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                    Zamówienia
                </Typography>
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Szukaj zamówienia"
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
                            <TableCell>Całkowita cena</TableCell>
                            <TableCell>Data zamówienia</TableCell>
                            <TableCell>Data wysyłki</TableCell>
                            <TableCell>Status zamówienia</TableCell>
                            <TableCell>Typ płatności</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredOrders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.basket?.id}</TableCell>
                                <TableCell>{order.basket?.totalPrice}</TableCell>
                                <TableCell>{order.orderDate}</TableCell>
                                <TableCell>{order.shipDate ? order.shipDate : 'Nie wysłano'}</TableCell>
                                <TableCell>
                                    <Select
                                        value={editingStatus[order.id] || order.state}
                                        onChange={(event) => handleSelectChange(order.id, event)}
                                        fullWidth
                                    >
                                        <MenuItem value="PENDING">PENDING</MenuItem>
                                        <MenuItem value="CONFIRMED">CONFIRMED</MenuItem>
                                        <MenuItem value="SHIPPED">SHIPPED</MenuItem>
                                        <MenuItem value="DELIVERED">DELIVERED</MenuItem>
                                        <MenuItem value="CANCELLED">CANCELLED</MenuItem>
                                    </Select>
                                </TableCell>
                                <TableCell>{order.type}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Box display="flex" justifyContent="center" m={2}>
                    <TablePagination
                        rowsPerPageOptions={[10, 20, 30]}
                        component="div"
                        count={filteredOrders.length}
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
        </Container>
    );
}

export default Orders;
