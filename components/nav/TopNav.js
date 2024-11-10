


'use client';

import React, { useState } from 'react';

import { AppBar, Toolbar, Typography, IconButton, InputBase, Box, Badge, Avatar, Drawer, List, ListItem, ListItemText, ListItemIcon, Divider } from '@mui/material';
import { Search as SearchIcon, Menu as MenuIcon, Favorite as FavoriteIcon, Category as CategoryIcon, School as SchoolIcon, Book as BookIcon, Close as CloseIcon, Person as PersonIcon } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SnapPOS from "@/components/nav/SnapPOS"
import Tooltip from '@mui/material/Tooltip';
import Link from 'next/link';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '35px',
    backgroundColor: alpha(theme.palette.common.black, 0),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0),
    },
    marginRight: theme.spacing(25),
    marginLeft: 0,
    width: '100%',
    border: "3px solid  white",
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(2, 2, 2, 0),
        paddingLeft: `calc(1em + ${theme.spacing(5)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '20ch'
        },
    },
}));

const Navbar = () => {
    const [fullscreen, setFullscreen] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
   
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMinimizeMaximize = () => {
        setScreenMinimized(!screenMinimized);
    };

    const menuId = 'primary-search-account-menu';
    const isMenuOpen = Boolean(anchorEl);















    const handleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setFullscreen(true);
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
            setFullscreen(false);
        }
    };

    return (
        <>
            <AppBar position="static" sx={{ bgcolor: '#1a1a1a', color: 'white' }} elevation={0}>
                <Toolbar sx={{ padding: "10px" }}>
                  
                    <Typography variant="h6" noWrap component="div">
                        <Link href="/" passHref>
                            <SnapPOS />
                        </Link>
                    </Typography>
                   
             
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon     />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
               
                    <Box sx={{ paddingLeft:"460px" }} >
                    <IconButton color="inherit" onClick={handleFullscreen}>
                        {fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                    </IconButton>
                    <Tooltip title="Account settings">
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <Avatar alt="Profile" src="/static/images/avatar/1.jpg" />
                        </IconButton>
                    </Tooltip>
                    </Box>

                </Toolbar>

                <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    id={menuId}
                    keepMounted
                    transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    open={isMenuOpen}
                    onClose={handleMenuClose}
                    sx={{ mt: 8 }}
                >
                    <MenuItem onClick={handleMenuClose} sx={{ mt: 1 }}>
                        <Link href="/dashboard/admin/profile" passHref>
                            <Typography textAlign="center">Profile</Typography>
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose} sx={{ mt: 1 }}>
                        <Link href="/dashboard/admin/change-password" passHref>
                            <Typography textAlign="center">Change Password</Typography>
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose} sx={{ mt: 1 }}>
                        <Link href="/dashboard/admin/logout" passHref>
                            <Typography textAlign="center">Logout</Typography>
                        </Link>
                    </MenuItem>
                </Menu>

            </AppBar>
            <Divider />
        </>
    );
};

export default Navbar;



