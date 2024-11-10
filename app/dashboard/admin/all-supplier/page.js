"use client"

// Import the CircularProgress component from Material-UI for displaying a loading spinner.
import CircularProgress from '@mui/material/CircularProgress';

// Import React and its hooks: useState and useEffect.
import React, { useState, useEffect } from 'react';

// Import various Material-UI components used to build the UI, such as layout containers, buttons, text fields, tables, modals, etc.
import {
  Box,
  // Container component for layout purposes.
 
  Typography,
  // Component for text styling and display.
  IconButton,
  // Button component that can contain an icon.
  Table,
  // Component for creating a table structure.
  TableBody,
  // Container for the body (rows) of the table.
  TableCell,
  // Component for individual cells in a table row.
  TableContainer,
  // Container that wraps the table.
  TableHead,
  // Container for the header (column titles) of the table.
  TableRow,
  // Component for individual rows in a table.
  TablePagination,
  // Component for handling table pagination.
  Paper,

} from '@mui/material';


// Import hooks from react-redux for connecting the component to the Redux store.
import { useDispatch, useSelector } from 'react-redux';

// Import actions from the supplierSlice to manage suppliers data in the Redux store.
import {
  fetchSuppliers,

} from '@/reduxslice/supplierSlice';




const SupplierTable = () => {

  // Initialize the dispatch function to dispatch actions to the Redux store.
  const dispatch = useDispatch();

  // Use the useSelector hook to retrieve the suppliers, loading status, and error from the Redux store.
  const { suppliers, loading, error } = useSelector(state => state.suppliers);

  // Initialize the page state to track the current page in pagination.
  const [page, setPage] = useState(0);

  // Initialize the rowsPerPage state to control the number of rows displayed per page.
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Initialize the filter state to store the user's filter input.
  const [filter, setFilter] = useState('');

  // Initialize the form state to store the input values for adding or editing a supplier.
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });

  // Use the useEffect hook to fetch the list of suppliers when the component mounts or when the dispatch function changes.
  useEffect(() => {
    dispatch(fetchSuppliers());
  }, [dispatch]);





  // Function to handle page changes in pagination.
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Function to handle changes in the number of rows displayed per page.
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };





 

  // Filter the list of suppliers based on the user's filter input.
  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier?.name?.toLowerCase().includes(filter.toLowerCase())
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
        Suppliers
      </Typography>



      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table hover>
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
            
            </TableRow>
          </TableHead>
          <TableBody>

            {

              loading ? (
                <TableRow>
                  <TableCell colSpan={3}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <CircularProgress color="inherit" />
                      <Typography sx={{ ml: 2 }}>Loading...</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    sx={{ color: 'red', fontWeight: 'bold' }}
                  >
                    Error: {error}
                  </TableCell>
                </TableRow>
              ) : (


                filteredSuppliers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((supplier, index) => (
                  <TableRow key={supplier._id}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{supplier.name}</TableCell>
                    <TableCell>{supplier.email}</TableCell>
                    <TableCell>{supplier.phone}</TableCell>
                    <TableCell>{supplier.address}</TableCell>
                 
                  </TableRow>
                ))



              )


            }





          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredSuppliers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
 
    </Box>
  );
};

export default SupplierTable;
