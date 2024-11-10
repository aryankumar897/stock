"use client";

import React, { useState } from 'react';
import { Container, Grid, TextField, Button, Link, Typography, Box, Snackbar, Alert, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import SnapPOS from "@/components/nav/SnapPOS"


const RegisterPage = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleRegister = async (e) => {
        e.preventDefault();

        // Basic form validation
        if (!name || !phone || !email || !password) {
            setSnackbarMessage('All fields are required');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
            return;
        }

        try {
            const response = await fetch(`${process.env.API}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, phone, email, password })
            });

            if (response.ok) {
                setSnackbarMessage('Registration successful');
                setSnackbarSeverity('success');
            } else {
                const data = await response.json();
                setSnackbarMessage(data.message || 'Registration failed');
                setSnackbarSeverity('error');
            }
        } catch (error) {
            setSnackbarMessage('An error occurred. Please try again.');
            setSnackbarSeverity('error');
        }

        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <Container maxWidth="xxl">
            <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12} md={6}>
                    <Box
                        component="form"
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ p: 3 }}
                        onSubmit={handleRegister}
                    >
                        <Typography variant="h4" gutterBottom>
                       <SnapPOS/>
                        </Typography>

                        <Typography variant="h4" gutterBottom>
                            Register
                        </Typography>
                        <TextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            InputLabelProps={{
                                style: { color: 'white' },
                            }}
                            InputProps={{
                                style: {
                                    color: '#fff',
                                    borderColor: 'blue',
                                },
                            }}
                            sx={{
                                input: { color: 'white' },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'blue',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'blue',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'blue',
                                    },
                                },
                            }}
                        />
                        <TextField
                            label="Phone"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            InputLabelProps={{
                                style: { color: 'white' },
                            }}
                            InputProps={{
                                style: {
                                    color: '#fff',
                                    borderColor: 'blue',
                                },
                            }}
                            sx={{
                                input: { color: 'white' },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'blue',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'blue',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'blue',
                                    },
                                },
                            }}
                        />
                        <TextField
                            label="Email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            InputLabelProps={{
                                style: { color: 'white' },
                            }}
                            InputProps={{
                                style: {
                                    color: '#fff',
                                    borderColor: 'blue',
                                },
                            }}
                            sx={{
                                input: { color: 'white' },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'blue',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'blue',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'blue',
                                    },
                                },
                            }}
                        />
                        <TextField
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputLabelProps={{
                                style: { color: 'white' },
                            }}
                            InputProps={{
                                style: {
                                    color: '#fff',
                                    borderColor: 'blue',
                                },
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={togglePasswordVisibility} sx={{ color: 'white' }}>
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                input: { color: 'white' },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'blue',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'blue',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'blue',
                                    },
                                },
                            }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                backgroundColor: 'blue',
                                '&:hover': {
                                    backgroundColor: 'blue'
                                },
                                mt: 2,
                                width: '100%'
                            }}
                        >
                            Register
                        </Button>
                        <Link href="/login" variant="body2" sx={{ mt: 2 }}>
                            Already have an account? Login
                        </Link>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            width: '100%',
                            height: '100vh',
                            display: { xs: 'none', md: 'block' }
                        }}
                    >
                        <Box
                            component="img"
                            src="/images/pos.jpg"
                            alt="Register image"
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default RegisterPage;
