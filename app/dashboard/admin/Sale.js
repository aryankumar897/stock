"use client"
import { Box, Grid, Paper, Typography } from '@mui/material';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import React from 'react';

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

export default function Dashboard() {
  // Sample data for charts
  const stockLevelsData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Stock Levels',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: 'rgba(75,192,192,0.4)',
      },
    ],
  };

  const salesData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Sales',
        data: [33, 53, 85, 41, 44, 65],
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
    ],
  };

  return (
    <Box sx={{ padding: 4 }}>
      
      <Grid container spacing={3}>
        {/* Stock Levels Chart */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>Stock Levels</Typography>
            <Bar data={stockLevelsData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
          </Paper>
        </Grid>

        {/* Sales Over Time Chart */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>Sales Over Time</Typography>
            <Line data={salesData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
