"use client"

import { useRouter } from 'next/navigation'


import { Box, Typography, Button, Grid, Card, CardActionArea, CardContent, Switch, Stack } from '@mui/material';
import { styled } from '@mui/system';
import { Dashboard, Inventory, Add, ListAlt, Assessment, ShoppingCart, People, Settings, BarChart } from '@mui/icons-material';

import { motion } from 'framer-motion';
import { useState } from 'react';

const pages = [
  { name: '12', icon: <Dashboard />, path: '/dashboard' },
  { name: '32', icon: <Inventory />, path: '/products' },
  { name: '35', icon: <Add />, path: '/add-product' },
  { name: '63', icon: <ListAlt />, path: '/inventory' },
  { name: '65', icon: <ShoppingCart />, path: '/orders' },
  { name: '32', icon: <Assessment />, path: '/reports' },
  { name: '45', icon: <People />, path: '/customers' },
  { name: '35', icon: <Settings />, path: '/settings' },
  { name: '65', icon: <BarChart />, path: '/analytics' },
];

// Background and styling
const BackgroundBox = styled(Box)({
  backgroundImage: 'url("/images/pos1.png")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  position: 'relative',
  padding: '4rem 2rem',
  textAlign: 'center',
  color: '#fff',
  overflow: 'hidden',
});

const Overlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  zIndex: 1,
});

const ContentBox = styled(Box)({
  position: 'relative',
  zIndex: 2,
});

const Home = () => {
  const router = useRouter();
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <BackgroundBox>



 

      <Overlay />
      <ContentBox>
        {/* Hero Section */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}>
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 'bold',
                  mb: 2,
                  background: 'linear-gradient(90deg, #ff8a00, #e52e71)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                }}
              >
                Welcome to the Product Inventory System
              </Typography>
            </motion.div>

            {/* Subheading */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <Typography
                variant="h6"
                color="inherit"
                sx={{
                  mb: 3,
                  lineHeight: 1.6,
                  color: '#d1d1d1',
                  maxWidth: '600px',
                  mx: 'auto',
                }}
              >
                Manage your products, inventory, and orders efficiently with our intuitive dashboard.
              </Typography>
            </motion.div>

         
          </Box>
        </motion.div>

     

        {/* Responsive Navigation Cards */}
        <Grid container spacing={4} justifyContent="center">
          {pages.map((page, index) => (
            <Grid
              item
              key={page.name}
              xs={12}
              sm={6}
              md={4}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <Card
                  sx={{
                    minHeight: 180,
                    boxShadow: 5,
                    borderRadius: 2,
                    backgroundColor: '#000',
                    color: '#fff',
                    transition: 'transform 0.3s, background-color 0.3s, color 0.3s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      backgroundColor: 'blue',
                      color: '#fff',
                    },
                  }}
                >
                  <CardActionArea
                  
               
                  >
                    <CardContent sx={{ textAlign: 'center', padding: '2rem' }}>
                      <Box sx={{ fontSize: 58, mb: 1, color: "greenyellow" }}>{page.icon}</Box>
                      <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                        {page.name}
                      </Typography>
                      <Typography variant="body2" color="inherit">
                        {`Go to ${page.path} section`}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </ContentBox>
    </BackgroundBox>
  );
};

export default Home;
