"use client"


// pages/dashboard.js

import { Box, Grid, Card, CardContent, Typography } from '@mui/material';
import { MotionConfig, motion } from 'framer-motion';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BuildIcon from '@mui/icons-material/Build';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';

export default function Dashboard() {
  // Define sample data for the 9 dashboard cards
  const cards = [
    { id: 1, title: 'Home', description: 'Go to home page', icon: <HomeIcon /> },
    { id: 2, title: 'Profile', description: 'User profile information', icon: <PersonIcon /> },
    { id: 3, title: 'Settings', description: 'Configure settings', icon: <SettingsIcon /> },
    { id: 4, title: 'About', description: 'About us', icon: <InfoIcon /> },
    { id: 5, title: 'Notifications', description: 'Check notifications', icon: <NotificationsIcon /> },
    { id: 6, title: 'Shop', description: 'View shopping cart', icon: <ShoppingCartIcon /> },
    { id: 7, title: 'Tools', description: 'Manage tools', icon: <BuildIcon /> },
    { id: 8, title: 'Favorites', description: 'Your favorite items', icon: <FavoriteIcon /> },
    { id: 9, title: 'Ratings', description: 'User ratings and feedback', icon: <StarIcon /> },
  ];

  // Framer Motion card animation properties
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    whileHover: { scale: 1.05 },
  };

  return (
    <MotionConfig>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Dashboard
        </Typography>
        <Grid container spacing={3}>
          {cards.map((card) => (
            <Grid item xs={12} sm={6} md={4} key={card.id}>
              <motion.div
                initial="hidden"
                animate="visible"
                whileHover="whileHover"
                variants={cardVariants}
              >
                <Card sx={{ minHeight: 150, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <CardContent>
                    <Box sx={{ fontSize: 40, color: 'primary.main' }}>{card.icon}</Box>
                    <Typography variant="h5" component="div" align="center" gutterBottom>
                      {card.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center">
                      {card.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </MotionConfig>
  );
}
