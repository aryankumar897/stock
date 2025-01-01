'use client'; // 🎨 Indicates this is a client-side component

// 🌟 Importing necessary modules
import { Box, Grid, Paper, Typography } from '@mui/material'; // 📦 Material-UI for layout and styling
import { Line, Bar } from 'react-chartjs-2'; // 📊 Chart.js components for visualization
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js'; // 🎨 Chart.js essentials
import React from 'react'; // ⚛️ React core library

// 🛠 Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

export default function Dashboard() {
  // 📊 Sample data for Stock Levels Chart
  const stockLevelsData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Stock Levels',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)', // Red
          'rgba(54, 162, 235, 0.6)', // Blue
          'rgba(255, 206, 86, 0.6)', // Yellow
          'rgba(75, 192, 192, 0.6)', // Green
          'rgba(153, 102, 255, 0.6)', // Purple
          'rgba(255, 159, 64, 0.6)', // Orange
        ],
      },
    ],
  };

  // 📊 Sample data for Sales Over Time Chart
  const salesData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Sales',
        data: [33, 53, 85, 41, 44, 65],
        borderColor: [
          'rgba(255, 99, 132, 1)', // Red
          'rgba(54, 162, 235, 1)', // Blue
          'rgba(255, 206, 86, 1)', // Yellow
          'rgba(75, 192, 192, 1)', // Green
          'rgba(153, 102, 255, 1)', // Purple
          'rgba(255, 159, 64, 1)', // Orange
        ],
        borderWidth: 2, // Makes the lines more prominent
        pointBackgroundColor: [
          'rgba(255, 99, 132, 1)', 
          'rgba(54, 162, 235, 1)', 
          'rgba(255, 206, 86, 1)', 
          'rgba(75, 192, 192, 1)', 
          'rgba(153, 102, 255, 1)', 
          'rgba(255, 159, 64, 1)'
        ],
        fill: false, // Keeps the chart clean without any fill
      },
    ],
  };

  // 🎨 Layout and rendering
  return (
    <Box sx={{ padding: 4 }}> {/* 🖼️ Overall container with padding */}
      <Grid container spacing={3}> {/* 🌐 Responsive grid container */}
        
        {/* 📊 Stock Levels Chart */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2, backgroundColor: 'black', color: 'white' }}>
            <Typography variant="h6" gutterBottom>
              Stock Levels
            </Typography>
            <Bar 
              data={stockLevelsData} 
              options={{ 
                responsive: true, 
                plugins: { 
                  legend: { position: 'top' } // 🧭 Legend positioned at the top
                } 
              }} 
            />
          </Paper>
        </Grid>

        {/* 📈 Sales Over Time Chart */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3}  sx={{ padding: 2, backgroundColor: 'black', color: 'white' }}>
            <Typography variant="h6" gutterBottom>
              Sales Over Time
            </Typography>
            <Line 
              data={salesData} 
              options={{ 
                responsive: true, 
                plugins: { 
                  legend: { position: 'top' } // 🧭 Legend positioned at the top
                } 
              }} 
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
