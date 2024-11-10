"use client"

// Importing React and its hooks `useState` and `useEffect` for state management and lifecycle events.
import React, { useState, useEffect } from 'react';

// Importing `useDispatch` and `useSelector` from Redux. 
// `useDispatch` is used to dispatch actions to the Redux store, 
// and `useSelector` is used to access the state from the Redux store.
import { useDispatch, useSelector } from 'react-redux';

// Importing various components from Material-UI for building the user interface.
import {
  Box,
  // A container component that aids in layout and styling.

  Typography,
  // A component for displaying text with different styles.
 
  Table,
  // A component for displaying tabular data.
  TableBody,
  // The body section of the table, containing rows.
  TableCell,
  // A cell within a table row.
  TableContainer,
  // A container for the table, adding styling and scrollability.
  TableHead,
  // The header section of the table, containing column titles.
  TableRow,
  // A row in the table, containing cells.
  TablePagination,
  // A component to handle pagination in tables.
  Paper,
  // A paper-like background for UI elements.

} from '@mui/material';


// Importing Redux actions related to products. 
// These actions are used to interact with the product-related state, 
// such as fetching, adding, updating, and deleting products.
import { fetchProducts } from '@/reduxslice/productSlice';


// Importing the CircularProgress component, which displays a loading spinner when data is being fetched or processed.
import CircularProgress from '@mui/material/CircularProgress';

const ProductTable = () => {





  // Initialize `dispatch` function to dispatch actions to the Redux store.
  const dispatch = useDispatch();

  // Access the products, loading status, and any errors from the Redux store's `products` state.
  const { products, loading, error } = useSelector(state => state.products);

  // useEffect hook runs on component mount to fetch products, units, suppliers, and categories from the store.
  useEffect(() => {
    dispatch(fetchProducts());     // Dispatch action to fetch products.
      // Dispatch action to fetch categories.
  }, [dispatch]);  // Dependencies array ensures actions are dispatched only when `dispatch` changes (e.g., component mount).

  // State to manage the current page in the table.
  const [page, setPage] = useState(0);

  // State to manage the number of rows per page in the table.
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // State to manage the filter text for searching products.
  const [filter, setFilter] = useState('');

  

  // Function to handle pagination changes in the table.
  const handleChangePage = (event, newPage) => {
    setPage(newPage);  // Update the current page state.
  };

  // Function to change the number of rows per page in the table.
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10)); // Update the rows per page state.
    setPage(0); // Reset to the first page.
  };



  // Filter the products based on the search filter input.
  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(filter.toLowerCase()) // Check if product name includes the filter string.
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
        Products
      </Typography>
     
      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table hover>
          <TableHead>
            <TableRow style={{ borderBottom: "6px solid blue" }}>
              <TableCell>S.No</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Supplier Name</TableCell>
              <TableCell>Unit Name</TableCell>
              <TableCell>Category Name</TableCell>
          
            </TableRow>
          </TableHead>
          <TableBody>


            {loading ? (
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
                <TableCell colSpan={3}>Error: {error}</TableCell>
              </TableRow>
            ) : (


              filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product, index) => (
                <TableRow key={product._id} style={{ borderBottom: "3px solid blue" }}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{product?.productName}</TableCell>
                  <TableCell>{product?.supplierNameId?.name}</TableCell>
                  <TableCell>{product?.unitNameId?.name}</TableCell>
                  <TableCell>{product?.categoryNameId?.name}</TableCell>
               
                </TableRow>
              ))

            )}


          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredProducts.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        sx={{ backgroundColor: "white" }}
      />

     
   
    </Box>
  );
};






export default ProductTable;
