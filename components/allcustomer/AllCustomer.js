
// Import React and its hooks `useState` and `useEffect`.
import React, { useState, useEffect } from 'react';

// Import `useDispatch` and `useSelector` hooks from Redux, 
// which are used to dispatch actions and access the Redux state respectively.
import { useDispatch, useSelector } from 'react-redux';

// Import specific actions from the `customerSlice` Redux slice. 
// These actions are used to interact with the customer-related state, 
// such as fetching, adding, updating, and deleting customers.
import { fetchCustomers, addCustomer, updateCustomer, deleteCustomer } from '@/reduxslice/customerSlice';

// Import Material-UI components that will be used for building the UI.
import {
    Box,             
      // A basic container component that helps with layout and styling.
    Button,            
     // A Material-UI button component for user interactions.
    TextField,         
     // A text input field component.
    Typography,        
     // A component used for displaying text with different styles.
    IconButton,        
     // A button component that displays an icon.
    Table,             
     // A component for displaying tabular data.
    TableBody,          
    // A component for the body of the table, which holds the rows.
    TableCell,         
     // A component for individual cells in a table row.
    TableContainer,    
     // A container component for the table, adding styling and scrollability.
    TableHead,         
     // A component for the table header, which typically contains column titles.
    TableRow,          
     // A component for each row of the table.
    TablePagination,   
     // A component for handling pagination in the table.
    Paper,             
     // A Material-UI component that provides a paper-like background for UI elements.
    Modal,             
     // A component for creating modal dialogs.
    Snackbar,          
     // A component for displaying brief messages (toasts) at the bottom of the screen.
    Alert,             
     // A component for showing alerts with different severity levels.
    Grid               
     // A component for creating responsive layouts using a grid system.
} from '@mui/material';

// Import icon components from Material-UI for use in buttons or other UI elements.
import { Edit, Delete, Add } from '@mui/icons-material';

// Import CircularProgress, a component that displays a loading spinner.
import CircularProgress from '@mui/material/CircularProgress';





const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/upload`;
const CLOUDINARY_PRESET = 'ml_default';

const CustomerTable = () => {
   
   // const customers = useSelector(state => state.customers.customers);
    // Get the `dispatch` function from Redux to dispatch actions.
    const dispatch = useDispatch();

    // Extract `customers`, `loading`, and `error` from the Redux state.
    const { customers, loading, error } = useSelector((state) => state.customers);

    // Log the customers data to the console for debugging.
    console.log("customersxxx", customers);

    // State to manage the current page for pagination, initialized to 0.
    const [page, setPage] = useState(0);

    // State to manage the number of rows per page for pagination, initialized to 5.
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // State to manage the filter input for searching customers by name.
    const [filter, setFilter] = useState('');

    // State to control the visibility of the "Add Customer" modal.
    const [openAddModal, setOpenAddModal] = useState(false);

    // State to control the visibility of the "Edit Customer" modal.
    const [openEditModal, setOpenEditModal] = useState(false);

    // State to control the visibility of the "Delete Customer" modal.
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    // State to keep track of the currently selected customer for editing or deleting.
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    // State to control the visibility and message of the snackbar notification.
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    // State to manage the form input values for adding a new customer.
    const [newCustomer, setNewCustomer] = useState({ name: '', address: '', email: '', mobileNumber: '', image: null });

    // State to manage the form input values for editing an existing customer.
    const [editCustomer, setEditCustomer] = useState({ name: '', address: '', email: '', mobileNumber: '', image: null });

    // State to manage the image preview for a new customer being added.
    const [newCustomerImagePreview, setNewCustomerImagePreview] = useState(null);

    // State to manage the image preview for an existing customer being edited.
    const [editCustomerImagePreview, setEditCustomerImagePreview] = useState(null);

    // useEffect hook to fetch the list of customers when the component mounts or when `dispatch` changes.
    useEffect(() => {
        dispatch(fetchCustomers()); // Dispatch the fetchCustomers action to load customer data from the server.
    }, [dispatch]);

    // Function to open the "Add Customer" modal.
    const handleOpenAddModal = () => setOpenAddModal(true);

    // Function to close the "Add Customer" modal.
    const handleCloseAddModal = () => setOpenAddModal(false);

    // Function to open the "Edit Customer" modal with the selected customer data.
    const handleOpenEditModal = (customer) => {
        setEditCustomer({ ...customer }); // Set the current customer data for editing.
        setSelectedCustomer(customer); // Set the selected customer state.
        setEditCustomerImagePreview(customer.image); // Set the image preview for editing.
        setOpenEditModal(true); // Open the "Edit Customer" modal.
    };

    // Function to close the "Edit Customer" modal.
    const handleCloseEditModal = () => setOpenEditModal(false);

    // Function to open the "Delete Customer" modal with the selected customer data.
    const handleOpenDeleteModal = (customer) => {
        setSelectedCustomer(customer); // Set the selected customer state.
        setOpenDeleteModal(true); // Open the "Delete Customer" modal.
    };

    // Function to close the "Delete Customer" modal.
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);

    // Function to handle the page change in the pagination controls.
    const handleChangePage = (event, newPage) => setPage(newPage);

    // Function to handle the change of rows per page in the pagination controls.
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10)); // Update the number of rows per page.
        setPage(0); // Reset the page number to the first page.
    };

    // Function to handle the filter input change for searching customers by name.
    const handleFilterChange = (event) => setFilter(event.target.value);

    // Function to handle the addition of a new customer.
    const handleAddCustomer = () => {
        // Dispatch the addCustomer action with the new customer data.
        dispatch(addCustomer({ ...newCustomer })).unwrap()
            .then(() => {
                // Show success message in the snackbar.
                setSnackbar({ open: true, message: 'Customer added successfully!', severity: 'success' });
                handleCloseAddModal(); // Close the "Add Customer" modal.
            })
            .catch((error) => {
                // Show error message in the snackbar if the request fails.
                setSnackbar({ open: true, message: `Error: ${error}`, severity: 'error' });
            });
    };

    // Function to handle the editing of an existing customer.
    const handleEditCustomer = () => {
        // Dispatch the updateCustomer action with the edited customer data.
        dispatch(updateCustomer({ ...editCustomer })).unwrap()
            .then(() => {
                // Show success message in the snackbar.
                setSnackbar({ open: true, message: 'Customer edited successfully!', severity: 'success' });
                handleCloseEditModal(); // Close the "Edit Customer" modal.
            })
            .catch((error) => {
                // Show error message in the snackbar if the request fails.
                setSnackbar({ open: true, message: `Error: ${error}`, severity: 'error' });
            });
    };

    // Function to handle the deletion of a customer.
    const handleDeleteCustomer = () => {
        // Dispatch the deleteCustomer action with the ID of the selected customer.
        dispatch(deleteCustomer(selectedCustomer._id)).unwrap()
            .then(() => {
                // Show success message in the snackbar.
                setSnackbar({ open: true, message: 'Customer deleted successfully!', severity: 'success' });
                handleCloseDeleteModal(); // Close the "Delete Customer" modal.
            })
            .catch((error) => {
                // Show error message in the snackbar if the request fails.
                setSnackbar({ open: true, message: `Error: ${error}`, severity: 'error' });
            });
    };

    // Function to close the snackbar notification.
    const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

    // Function to handle file input changes for uploading images.
    const handleFileChange = async (event, setter, previewSetter) => {
        const file = event.target.files[0]; // Get the selected file from the input.
        if (file) {
            const fileUrl = URL.createObjectURL(file); // Create a preview URL for the image.
            previewSetter(fileUrl); // Set the preview URL in the state.

            const formData = new FormData(); // Create a FormData object to send the file.
            formData.append('file', file); // Append the file to the FormData.
            formData.append('upload_preset', CLOUDINARY_PRESET); // Append the Cloudinary preset.

            try {
                // Send a POST request to Cloudinary to upload the image.
                const response = await fetch(CLOUDINARY_UPLOAD_URL, {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json(); // Parse the response JSON.
                const imageUrl = data?.secure_url; // Get the secure URL of the uploaded image.

                console.log('Image URL:', imageUrl); // Log the image URL for debugging.

                // Update the image URL in the state using the setter function.
                setter(prev => ({
                    ...prev,
                    image: imageUrl
                }));
                setSnackbar({ open: true, message: 'Image Uploaded successfully!', severity: 'success' }); // Show success message.

                console.log('Updated newCustomer in setter:', newCustomer); // Log the updated customer data for debugging.

            } catch (error) {
                // Show error message in the snackbar if the upload fails.
                setSnackbar({ open: true, message: `Error: ${error}`, severity: 'error' });
                console.error('Error uploading image to Cloudinary:', error); // Log the error for debugging.
            }
        }
    };

    // Filter the customers based on the filter input, comparing it with the customer's name.
    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(filter.toLowerCase())
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
                Customers
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
                        Add Customer
                    </Button>
                </Grid>
            </Grid>
            <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
                <Table hover>
                    <TableHead>
                        <TableRow style={{ borderBottom: "6px solid blue" }}>
                            <TableCell>S.No</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Image</TableCell>
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



                        filteredCustomers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((customer, index) => (
                            <TableRow key={customer._id} style={{ borderBottom: "2px solid blue" }}>
                                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                <TableCell>{customer.name}</TableCell>
                                <TableCell>{customer.address}</TableCell>
                                <TableCell>{customer.email}</TableCell>
                                <TableCell>
                                    {customer.image && (
                                        <img
                                            src={customer.image}
                                            alt={customer.name}
                                            style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                                        />
                                    )}
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleOpenEditModal(customer)}>
                                        <Edit
                                            sx={{
                                                color: 'blue',
                                                ':hover': {
                                                    color: 'darkred',
                                                },
                                            }}
                                        
                                        
                                         />
                                    </IconButton>
                                    <IconButton onClick={() => handleOpenDeleteModal(customer)}>
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
                        )))
                        
                        }
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={filteredCustomers.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
            <Modal
                sx={modalBackdropStyle}
            
             open={openAddModal} onClose={handleCloseAddModal}>
                <Box
                    sx={modalStyle}  
                >
                    <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                        Add Customer
                    </Typography>
                    <TextField
                        fullWidth
                        label="Name"
                        variant="outlined"
                        margin="normal"
                        value={newCustomer.name}
                        onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                   
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
                   
                    />
                    <TextField
                        fullWidth
                        label="Address"
                        variant="outlined"
                        margin="normal"
                        value={newCustomer.address}
                        onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                  
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
                  
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        value={newCustomer.email}
                        onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                  
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
                  
                    />
                    <TextField
                        fullWidth
                        label="Mobile Number"
                        variant="outlined"
                        margin="normal"
                        value={newCustomer.mobileNumber}
                        onChange={(e) => setNewCustomer({ ...newCustomer, mobileNumber: e.target.value })}
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
                   
                    />


  <Button
                         variant="contained"
                        component="label"
                        
                        sx={{ mt: 2, backgroundColor: 'blue', ':hover': { backgroundColor: 'blue' } }}
                   
                   
                    >
                    Upload Image
                    <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, setNewCustomer, setNewCustomerImagePreview)}
                    />

                        </Button>

                    {newCustomerImagePreview && (
                        <img
                            src={newCustomerImagePreview}
                            alt="Preview"
                            style={{ width: '100px', height: '100px', marginTop: '10px' }}
                        />
                    )}
                    <Button
                        variant="contained"
                     
                        onClick={handleAddCustomer}
                        sx={{ mt: 2,ml:2, backgroundColor: 'blue', ':hover': { backgroundColor: 'blue' } }}


                    >
                        Add
                    </Button>
                </Box>
            </Modal>
            <Modal
                sx={modalBackdropStyle}
            
             open={openEditModal} onClose={handleCloseEditModal}>
                <Box
                    sx={modalStyle}  
                >
                    <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                        Edit Customer
                    </Typography>
                    <TextField
                        fullWidth
                        label="Name"
                        variant="outlined"
                        margin="normal"
                        value={editCustomer.name}
                        onChange={(e) => setEditCustomer({ ...editCustomer, name: e.target.value })}
                    

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

                    />
                    <TextField
                        fullWidth
                        label="Address"
                        variant="outlined"
                        margin="normal"
                        value={editCustomer.address}
                        onChange={(e) => setEditCustomer({ ...editCustomer, address: e.target.value })}
                   
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
                   
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        value={editCustomer.email}
                        onChange={(e) => setEditCustomer({ ...editCustomer, email: e.target.value })}
                   
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
                   
                    />
                    <TextField
                        fullWidth
                        label="Mobile Number"
                        variant="outlined"
                        margin="normal"
                        value={editCustomer.mobileNumber}
                        onChange={(e) => setEditCustomer({ ...editCustomer, mobileNumber: e.target.value })}
                  
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
                  
                  
                    />


                    <Button
                        variant="contained"
                        component="label"

                        sx={{ mt: 2, backgroundColor: 'blue', ':hover': { backgroundColor: 'blue' } }}


                    >
                        Upload Image


                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) => handleFileChange(e, setEditCustomer, setEditCustomerImagePreview)}
                    />

                       </Button>
                    {editCustomerImagePreview && (
                        <img
                            src={editCustomerImagePreview}
                            alt="Preview"
                            style={{ width: '100px', height: '100px', marginTop: '10px' }}
                        />
                    )}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleEditCustomer}
                        sx={{ mt: 2, backgroundColor: 'blue', ':hover': { backgroundColor: 'blue' } }}

                    >
                        Save
                    </Button>
                </Box>
            </Modal>
            <Modal 
                sx={modalBackdropStyle}

            open={openDeleteModal} onClose={handleCloseDeleteModal}>
                <Box
                    sx={modalStyle}   
                >
                    <Typography variant="h6" component="h2">
                        Are you sure you want to delete this customer?
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button
                            onClick={handleCloseDeleteModal}
                            sx={{ mr: 1 }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor:"red",
                                color: 'white',
                                ':hover': {
                                    backgroundColor: "red",
                                
                                },
                            }}
                            onClick={handleDeleteCustomer}
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
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
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



export default CustomerTable;
              





     