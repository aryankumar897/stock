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

import { fetchCategories, addCategory, updateCategory, deleteCategory } from '@/reduxslice/categorySlice';



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

    // Function to open the Add Category modal and reset the new category name state.
    // Invoked when the user clicks the button to add a new category.
    const handleOpenAddModal = () => setOpenAddModal(true);

    // Function to close the Add Category modal and clear the new category name state.
    // Resets the state when the Add Category modal is closed, either after adding a category or canceling.
    const handleCloseAddModal = () => {
        setOpenAddModal(false);
        setNewCategoryName('');
    };

    // Function to open the Edit Category modal with the selected category's data.
    // Sets the selected category's data into state and opens the Edit Category modal when a user chooses to edit a category.
    const handleOpenEditModal = (category) => {
        setSelectedCategory(category);
        setEditCategoryName(category.name);
        setOpenEditModal(true);
    };

    // Function to close the Edit Category modal.
    // Simply closes the modal when the user cancels or after the category is edited.
    const handleCloseEditModal = () => setOpenEditModal(false);

    // Function to open the Delete Category modal with the selected category's data.
    // Sets the selected category and opens the Delete Category modal when a user chooses to delete a category.
    const handleOpenDeleteModal = (category) => {
        setSelectedCategory(category);
        setOpenDeleteModal(true);
    };

    // Function to close the Delete Category modal.
    // Closes the modal when the user cancels or after the category is deleted.
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);

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

    // Function to handle changes in the filter text for searching categories.
    // Updates the `filter` state as the user types in the search box.
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    // Function to handle adding a new category, dispatches the `addCategory` action and handles success or error.
    // Creates a new category object, sends it to the server, and displays a snackbar notification based on the result.
    const handleAddCategory = () => {
        const newCategory = { name: newCategoryName };
        dispatch(addCategory(newCategory)).unwrap()
            .then(() => {
                setSnackbar({ open: true, message: 'Category added successfully!', severity: 'success' });
                handleCloseAddModal(); // Close the modal after successful addition.
            })
            .catch((error) => {
                 console.log(error.err)
                setSnackbar({ open: true, message: `Error: ${error.err}`, severity: 'error' });
            });
    };

    // Function to handle updating an existing category, dispatches the `updateCategory` action and handles success or error.
    // Updates the selected category with the new name, sends the updated data to the server, and displays a notification based on the result.
    const handleEditCategory = () => {
        const updatedCategory = { ...selectedCategory, name: editCategoryName };
        dispatch(updateCategory(updatedCategory)).unwrap()
            .then(() => {
                setSnackbar({ open: true, message: 'Category edited successfully!', severity: 'success' });
                handleCloseEditModal(); // Close the modal after successful editing.
            })
            .catch((error) => {
                setSnackbar({ open: true, message: `Error: ${error}`, severity: 'error' });
            });
    };

    // Function to handle deleting a category, dispatches the `deleteCategory` action and handles success or error.
    // Sends a request to delete the selected category by its ID and displays a snackbar notification based on the result.
    const handleDeleteCategory = () => {
        dispatch(deleteCategory(selectedCategory?._id)).unwrap()
            .then(() => {
                setSnackbar({ open: true, message: 'Category deleted successfully!', severity: 'success' });
                handleCloseDeleteModal(); // Close the modal after successful deletion.
            })
            .catch((error) => {
                setSnackbar({ open: true, message: `Error: ${error}`, severity: 'error' });
            });
    };

    // Function to close the snackbar notification.
    // Resets the `open` state of the snackbar to false, hiding the notification.
    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
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
            <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={8}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search..."
                        value={filter}
                        onChange={handleFilterChange}
                        sx={{
                            input: { color: 'white' },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'blue',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'blue',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'blue',
                                },
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Button
                        fullWidth
                        variant="contained"
                        startIcon={<Add />}
                        onClick={handleOpenAddModal}
                        sx={{
                            backgroundColor: 'blue',
                            ':hover': {
                                backgroundColor: 'blue',
                            },
                            height: '100%',
                        }}
                    >
                        Add Category
                    </Button>
                </Grid>
            </Grid>
            <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
                <Table hover>
                    <TableHead>
                        <TableRow>
                            <TableCell>S.No</TableCell>
                            <TableCell>Category Name</TableCell>
                            <TableCell>Actions</TableCell>
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
                                    <TableCell>
                                        <IconButton onClick={() => handleOpenEditModal(category)}>
                                            <Edit

                                                sx={{
                                                    color: 'blue',
                                                    ':hover': {
                                                        color: 'darkred',
                                                    },
                                                }}

                                            />
                                        </IconButton>
                                        <IconButton onClick={() => handleOpenDeleteModal(category)}>
                                            <Delete


                                                sx={{
                                                    color: 'red',
                                                    ':hover': {
                                                        color: 'darkred',
                                                    },
                                                }}

                                            />
                                        </IconButton>
                                    </TableCell>
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
            {/* Add Category Modal */}
            <Modal
                open={openAddModal}
                onClose={handleCloseAddModal}
                aria-labelledby="add-category-modal"
                aria-describedby="add-category-modal-description"
                sx={modalBackdropStyle}
            >
                <Box sx={modalStyle}>
                    <Typography id="add-category-modal" variant="h6" component="h2">
                        Add Category
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Category Name"
                        value={newCategoryName}
                        InputLabelProps={{
                            style: { color: 'white' },
                        }}
                        sx={{
                            mt: 2,
                            input: { color: 'white' },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'blue',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'blue',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'blue',
                                },
                            },
                        }}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                    />
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={handleCloseAddModal} sx={{ mr: 1 }}>Cancel</Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddCategory}
                            sx={{
                                backgroundColor: 'blue',
                                ':hover': {
                                    backgroundColor: 'blue',
                                },
                            }}
                        >
                            Add
                        </Button>
                    </Box>
                </Box>
            </Modal>
            {/* Edit Category Modal */}
            <Modal
                open={openEditModal}
                onClose={handleCloseEditModal}
                aria-labelledby="edit-category-modal"
                aria-describedby="edit-category-modal-description"
                sx={modalBackdropStyle}
            >
                <Box sx={modalStyle}>
                    <Typography id="edit-category-modal" variant="h6" component="h2">
                        Edit Category
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Category Name"
                        value={editCategoryName}
                        InputLabelProps={{
                            style: { color: 'white' },
                        }}
                        sx={{
                            mt: 2,
                            input: { color: 'white' },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'blue',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'blue',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'blue',
                                },
                            },
                        }}
                        onChange={(e) => setEditCategoryName(e.target.value)}
                    />
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={handleCloseEditModal} sx={{ mr: 1 }}>Cancel</Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleEditCategory}
                            sx={{
                                backgroundColor: 'blue',
                                ':hover': {
                                    backgroundColor: 'blue',
                                },
                            }}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </Modal>
            {/* Delete Category Modal */}
            <Modal
                open={openDeleteModal}
                onClose={handleCloseDeleteModal}
                aria-labelledby="delete-category-modal"
                aria-describedby="delete-category-modal-description"
                sx={modalBackdropStyle}
            >
                <Box
                    sx={modalStyle}

                >
                    <Typography id="delete-category-modal" variant="h6" component="h2">
                        Delete Category
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Are you sure you want to delete this category?
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={handleCloseDeleteModal} sx={{ mr: 1 }}>Cancel</Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleDeleteCategory}
                            sx={{
                                backgroundColor: 'red',
                                ':hover': {
                                    backgroundColor: 'darkred',
                                },
                            }}
                        >
                            Delete
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
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
