// Import React and useState, useEffect hooks from the React library.

"use client"
import React, { useState, useEffect } from 'react';

// Import useDispatch and useSelector hooks from the React-Redux library for interacting with the Redux store.
import { useDispatch, useSelector } from 'react-redux';


import {
  Box,
 
  Typography,
  // Component for displaying text with various styles.
  IconButton,
  // Button component for icons that can be clicked.
  Table,
  // Table component for displaying data in rows and columns.
  TableBody,
  // Component for the body of the table, containing table rows.
  TableCell,
  // Component for individual cells in a table row.
  TableContainer,
  // Container component for wrapping the table, providing scrollability and padding.
  TableHead,
  // Component for the header of the table, containing column titles.
  TableRow,
  // Component for individual rows in a table.
  TablePagination,
  // Component for handling pagination in the table.
  Paper,
  // Component that provides a paper-like background, often used as a wrapper for other components.

} from '@mui/material';

// Import Redux actions for fetching, adding, updating, and deleting units from the unit slice.
import { fetchUnits, } from '@/reduxslice/unitSlice';





const UnitTable = () => {



  // Initialize the dispatch function to trigger actions in the Redux store.
  const dispatch = useDispatch();

  // Destructure the `units`, `loading`, and `error` state from the Redux store's `units` slice.
  const { units, loading, error } = useSelector((state) => state.units);

  // useEffect hook runs when the component mounts, dispatching an action to fetch the list of units.
  useEffect(() => {
    dispatch(fetchUnits());  // Fetch units from the backend and update the Redux store.
  }, [dispatch]);  // Dependencies array ensures the effect runs when `dispatch` changes.

  // useState hook to manage the current page number in the pagination component.
  const [page, setPage] = useState(0);

  // useState hook to manage the number of rows displayed per page in the table.
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // useState hook to manage the filter value for searching units by name.
  const [filter, setFilter] = useState('');

  
  

  // Function to change the page in the pagination component.
  const handleChangePage = (event, newPage) => {
    setPage(newPage);  // Update the current page number.
  };

  // Function to change the number of rows per page in the pagination component.
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));  // Update the number of rows per page.
    setPage(0);  // Reset the page number to 0 when changing rows per page.
  };

 


 
 

  // Filter the units based on the user's input in the filter field.
  const filteredUnits = units.filter((unit) =>
    unit.name.toLowerCase().includes(filter.toLowerCase())  // Convert both the unit name and filter to lowercase for case-insensitive matching.
  );

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}

        style={{
          fontSize: '3rem',
          color: '#0073e6',       // A nice blue color
          marginBottom: '20px',
          textAlign: 'center',
          fontWeight: 'bold',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
          padding: '10px',
          borderBottom: '2px solid #0073e6', // Underline effect
          letterSpacing: '1px',
        }}

      >
        Units
      </Typography>
     
      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table hover>
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Unit Name</TableCell>
           
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUnits.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((unit, index) => (
              <TableRow key={unit._id}>
                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                <TableCell>{unit.name}</TableCell>
               
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredUnits.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
   
    </Box>
  );
};


export default UnitTable;
