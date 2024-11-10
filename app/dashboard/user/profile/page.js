"use client"


"use client";

import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Snackbar, Alert, IconButton, Card, CardContent, CardMedia } from '@mui/material';


import SnapPOS from "@/components/nav/SnapPOS";
import axios from 'axios';

const ProfileComponent = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [image, setImage] = useState('https://cdn.pixabay.com/photo/2016/12/18/10/20/application-1915345_1280.jpg');
    const [imageUrl, setImageUrl] = useState('https://cdn.pixabay.com/photo/2016/12/18/10/20/application-1915345_1280.jpg');
    const [error, setError] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !username || !imageUrl) {
            setError('Please fill in all fields and upload an image');
            return;
        }

        try {
            const response = await fetch('/api/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, username, imageUrl }),
            });

            const result = await response.json();
            if (response.ok) {
                setSnackbar({ open: true, message: 'Profile updated successfully!', severity: 'success' });
            } else {
                setSnackbar({ open: true, message: result.message || 'Profile update failed!', severity: 'error' });
            }
        } catch (error) {
            setSnackbar({ open: true, message: 'An error occurred. Please try again.', severity: 'error' });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'your_upload_preset'); // replace with your Cloudinary upload preset

        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', 
                formData
            
            
            ); // replace with your Cloudinary cloud name
            setImageUrl(response.data.secure_url);
            setImage(file);
            setSnackbar({ open: true, message: 'Image uploaded successfully!', severity: 'success' });
        } catch (error) {
            setSnackbar({ open: true, message: 'Image upload failed. Please try again.', severity: 'error' });
        }
    };

    return (
        <Box
            sx={{
                backgroundImage: 'url(/images/pos.jpg)',
                backgroundSize: 'cover',
                height: '100vh',
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
                    maxWidth: '800px',
                    textAlign: 'center',
                    color: 'white',
                }}
            >
                <Typography variant="h4" sx={{ ml: 10 }}>
                    <SnapPOS />
                </Typography>

                <Typography variant="h4" sx={{ mb: 2, color: "white" }}>
                    Profile
                </Typography>
                {error && (
                    <Typography color="error" sx={{ mb: 2 }}>
                        {error}
                    </Typography>
                )}
                <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
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
                    fullWidth
                    label="Email"
                    variant="outlined"
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
                    fullWidth
                    label="Username"
                    variant="outlined"
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                <Button
                    variant="contained"
                    component="label"
                    fullWidth
                    sx={{
                        mt: 2,
                        backgroundColor: 'blue',
                        ':hover': {
                            backgroundColor: 'blue',
                        },
                    }}
                >
                    Upload Image
                    <input
                        type="file"
                        hidden
                        onChange={handleImageUpload}
                    />
                </Button>
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
                    Save Profile
                </Button>
            </Box>
            {imageUrl && (
                <Card 
                sx={{ m: 2, width: '100%',
                 maxWidth: '400px',
                  backgroundColor:
                 
                  'black', color: 'white'
                  
                   }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={imageUrl}
                        alt="Profile Image"
                    />
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {name}
                        </Typography>
                        <Typography variant="body2">
                            Email: {email}
                        </Typography>
                        <Typography variant="body2">
                            Username: {username}
                        </Typography>
                    </CardContent>
                </Card>
            )}
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

export default ProfileComponent;
