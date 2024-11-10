// Enable the "use client" directive, which ensures that this file is treated as a client-side module in Next.js.
"use client";

// Import necessary React hooks and components from the React library.
import React, { useEffect, useState } from 'react';

import {
  Box,
  // Container component that can be used to create structure and layout.
  Button,
  // Button component for clickable actions.
  TextField,
  // Input field component for text input.
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
  Modal,
  // Component for creating modals or dialog boxes.
  Snackbar,
  // Component for displaying brief messages at the bottom of the screen.
  Alert,
  // Component for displaying alerts or notifications with varying severity levels.
  Grid
  // Component for creating responsive grids and layouts.
} from '@mui/material';

// Import specific Material-UI icons that are used for editing, deleting, and adding items.
import { Edit, Delete, Add } from '@mui/icons-material';

// Import Redux hooks for selecting state and dispatching actions.
import { useSelector, useDispatch } from 'react-redux';

// Import Redux actions to fetch, add, update, and delete categories from the category slice.

import { fetchCategories, } from '@/reduxslice/categorySlice';



// Import the CircularProgress component from Material-UI for showing a loading spinner.
import CircularProgress from '@mui/material/CircularProgress';




const CategoryTable = () => {
  // Import and initialize the Redux `dispatch` function to send actions to the store.
  const dispatch = useDispatch();

  // Extract `categories`, `loading`, and `error` from the Redux store's state using `useSelector`. 
  // `categories` holds the list of categories, `loading` indicates if data is being fetched, and `error` captures any errors during fetch.
  const { categories, loading, error } = useSelector((state) => state.categories);

  // Local state for the current page number in pagination, initialized to 0. 
  // Tracks which page of data is currently being viewed.
  const [page, setPage] = useState(0);

  // Local state for the number of rows per page in pagination, initialized to 5. 
  // Controls how many items are displayed on each page.
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Local state for the filter text to search through categories, initialized to an empty string. 
  // Helps in filtering the displayed categories based on the input value.
  const [filter, setFilter] = useState('');

  // Local state to control the visibility of the Add Category modal, initialized to false (hidden). 
  // Determines whether the modal for adding a new category is open.
  const [openAddModal, setOpenAddModal] = useState(false);

  // Local state to control the visibility of the Edit Category modal, initialized to false (hidden). 
  // Determines whether the modal for editing an existing category is open.
  const [openEditModal, setOpenEditModal] = useState(false);

  // Local state to control the visibility of the Delete Category modal, initialized to false (hidden). 
  // Determines whether the modal for deleting a category is open.
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  // Local state to keep track of the currently selected category for editing or deleting, initialized to null. 
  // Stores the category data that is selected for editing or deletion.
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Local state to manage the name of a new category being added, initialized to an empty string. 
  // Stores the input value for the new category name.
  const [newCategoryName, setNewCategoryName] = useState('');

  // Local state to manage the name of an existing category being edited, initialized to an empty string. 
  // Stores the input value for the category name being edited.
  const [editCategoryName, setEditCategoryName] = useState('');

  // Local state for the snackbar notifications, including visibility, message, and severity level (success or error). 
  // Controls feedback notifications that appear after actions like adding, editing, or deleting a category.
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Use `useEffect` to fetch categories from the API when the component mounts or when `dispatch` changes. 
  // The dispatch call to `fetchCategories` retrieves the list of categories from the server and updates the Redux store.


  useEffect(() => {
    dispatch(fetchCategories());
    //dispatch(fetchSuppliers());
  }, [dispatch]);

 

  // Function to handle pagination page changes.
  // Updates the current page number when the user navigates through the pagination controls.
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Function to handle changes in the number of rows per page in pagination.
  // Updates the `rowsPerPage` state with the user's selection and resets the current page to 0.
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10)); // Parse the new rows per page value as an integer.
    setPage(0); // Reset page number to 0 when the number of rows per page changes.
  };





  // Filter categories based on the filter text (case-insensitive).
  // The filtered categories list is generated by checking if each category name includes the filter text.
  const filteredCategories = categories.filter((category) =>
    category?.name?.toLowerCase().includes(filter.toLowerCase())
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
        Categories
      </Typography>
    
      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table hover>
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
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
              filteredCategories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((category, index) => (
                <TableRow key={category._id}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{category.name}</TableCell>
               
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredCategories.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          backgroundColor: "white"
        }}
      />
    
    
    </Box>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'black',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: 'white',
};

const modalBackdropStyle = {
  backdropFilter: 'blur(5px)',
};

export default CategoryTable;
