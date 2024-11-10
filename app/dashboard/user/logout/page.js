"use client"


"use client";

import React from 'react';
import { Box, Button, Typography, Snackbar, Alert, Card, CardContent, CardMedia } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import SnapPOS from "@/components/nav/SnapPOS";

const LogoutComponent = () => {
    const { data: session } = useSession();
    const [snackbar, setSnackbar] = React.useState({ open: false, message: '', severity: 'success' });

    const handleLogout = async () => {
        try {
            await signOut();
            setSnackbar({ open: true, message: 'Logout successful!', severity: 'success' });
        } catch (error) {
            setSnackbar({ open: true, message: 'Logout failed. Please try again.', severity: 'error' });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
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
                px: 2,
                opacity: 0.9,
                flexDirection: 'column',
            }}
        >
            <Box
                sx={{
                    backgroundColor: 'black',
                    p: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                    width: '100%',
                    maxWidth: '400px',
                    textAlign: 'center',
                    color: 'white',
                }}
            >
                <Typography variant="h4" sx={{ mb: 2 }}>
                    <SnapPOS />
                </Typography>

                <Typography variant="h4" sx={{ mb: 2, color: "white" }}>
                    Logout
                </Typography>

                {session && (
                    <Card sx={{ mb: 2, backgroundColor: 'black', color: 'white' }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={session.user.image || '/images/default-profile.png'}
                            alt="Profile Image"
                        />
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {session.user.name}
                            </Typography>
                            <Typography variant="body2">
                                Email: {session.user.email}
                            </Typography>
                        </CardContent>
                    </Card>
                )}

                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                        mt: 2,
                        backgroundColor: 'blue',
                        ':hover': {
                            backgroundColor: 'blue',
                        },
                    }}
                    onClick={handleLogout}
                >
                    Logout
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

export default LogoutComponent;
