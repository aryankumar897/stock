"use client"

"use client"

import React, { useState } from 'react';
import { Link, Box, Button, TextField, Typography, Snackbar, Alert, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import SnapPOS from "@/components/nav/SnapPOS"

const ChangePasswordComponent = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!oldPassword || !newPassword || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('New password and confirm password do not match');
            return;
        }

        try {
            const response = await fetch('/api/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ oldPassword, newPassword }),
            });

            const result = await response.json();
            if (response.ok) {
                setSnackbar({ open: true, message: 'Password changed successfully!', severity: 'success' });
            } else {
                setSnackbar({ open: true, message: result.message || 'Password change failed!', severity: 'error' });
            }
        } catch (error) {
            setSnackbar({ open: true, message: 'An error occurred. Please try again.', severity: 'error' });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box
            sx={{
                backgroundImage: 'url(/images/pos.jpg)',
                backgroundSize: 'cover',
                height: '95vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
               
                opacity: 0.9
            }}
        >
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    backgroundColor: 'black',
                    p: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                    width: '100%',
                    maxWidth: '600px',
                    textAlign: 'center',
                }}
            >
                <Typography variant="h4" sx={{ ml: 10, }}>
                    <SnapPOS />
                </Typography>

                <Typography variant="h4" sx={{ mb: 2, color: "white" }}>
                    Change Password
                </Typography>
                {error && (
                    <Typography color="error" sx={{ mb: 2 }}>
                        {error}
                    </Typography>
                )}
                <TextField
                    fullWidth
                    label="Old Password"
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    margin="normal"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
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
                                <IconButton
                                    onClick={togglePasswordVisibility}
                                    edge="end"
                                    sx={{ color: 'white' }}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
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
                <TextField
                    fullWidth
                    label="New Password"
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    margin="normal"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
                                <IconButton
                                    onClick={togglePasswordVisibility}
                                    edge="end"
                                    sx={{ color: 'white' }}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
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
                <TextField
                    fullWidth
                    label="Confirm New Password"
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    margin="normal"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                                <IconButton
                                    onClick={togglePasswordVisibility}
                                    edge="end"
                                    sx={{ color: 'white' }}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
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
                    fullWidth
                    sx={{
                        mt: 2,
                        backgroundColor: 'blue',
                        ':hover': {
                            backgroundColor: 'blue',
                        },
                    }}
                >
                    Change Password
                </Button>
            </Box>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ChangePasswordComponent;
