import React, { useState, useEffect } from 'react';
import {
    Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, IconButton, Toolbar, InputAdornment, TextField, TableSortLabel, Box, TablePagination
} from '@mui/material';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [search, setSearch] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/users', { withCredentials: true });
                const sortedData = sortData(response.data, 'asc');
                setUsers(sortedData);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSort = () => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        const sortedData = sortData([...users], newSortOrder);
        setSortOrder(newSortOrder);
        setUsers(sortedData);
    };

    const handleClickOpen = (user) => {
        setSelectedUser(user);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedUser(null);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8081/api/users/${selectedUser.id}`, { withCredentials: true });
            setUsers(users.filter(user => user.id !== selectedUser.id));
            handleClose();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.lastName.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Container>
            <Toolbar>
                <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                    Użytkownicy
                </Typography>
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Szukaj użytkownika"
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
                            <TableCell>Imię</TableCell>
                            <TableCell>Nazwisko</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Telefon</TableCell>
                            <TableCell>Hasło</TableCell>
                            <TableCell>Akcje</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.lastName}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>{user.password}</TableCell>
                                <TableCell>
                                    <IconButton color="secondary" onClick={() => handleClickOpen(user)}>
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
                        count={filteredUsers.length}
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
                <DialogTitle>Usuń użytkownika</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Czy na pewno chcesz usunąć użytkownika {selectedUser?.name} {selectedUser?.lastName}?
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
};

export default Users;
