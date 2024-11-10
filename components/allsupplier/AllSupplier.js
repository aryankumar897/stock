// Import the CircularProgress component from Material-UI for displaying a loading spinner.
import CircularProgress from '@mui/material/CircularProgress';

// Import React and its hooks: useState and useEffect.
import React, { useState, useEffect } from 'react';

// Import various Material-UI components used to build the UI, such as layout containers, buttons, text fields, tables, modals, etc.
import {
    Box,          
       // Container component for layout purposes.
    Button,        
      // Button component for user interactions.
    TextField,      
     // Input field for user text input.
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
      // Component that serves as a background container.
    Modal,         
      // Component for creating modal dialogs.
    Snackbar,        
    // Component for displaying brief notifications.
    Alert,         
      // Component for displaying alert messages.
    Grid            
     // Component for grid-based layout.
} from '@mui/material';

// Import icons from Material-UI, used for editing, deleting, and adding items.
import { Edit, Delete, Add } from '@mui/icons-material';

// Import hooks from react-redux for connecting the component to the Redux store.
import { useDispatch, useSelector } from 'react-redux';

// Import actions from the supplierSlice to manage suppliers data in the Redux store.
import {
    fetchSuppliers,     
     // Action to fetch the list of suppliers from the store.
    addSupplier,        
     // Action to add a new supplier.
    updateSupplier,     
     // Action to update an existing supplier.
    deleteSupplier      
     // Action to delete a supplier.
} from '@/reduxslice/supplierSlice';
import RefreshIcon from '@mui/icons-material/Refresh';



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

    // Initialize the state to control the visibility of the "Add" modal.
    const [openAddModal, setOpenAddModal] = useState(false);

    // Initialize the state to control the visibility of the "Edit" modal.
    const [openEditModal, setOpenEditModal] = useState(false);

    // Initialize the state to control the visibility of the "Delete" modal.
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    // Initialize the state to store the currently selected supplier for editing or deleting.
    const [selectedSupplier, setSelectedSupplier] = useState(null);

    // Initialize the snackbar state to manage notifications, including visibility, message, and severity (e.g., success or error).
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    // Initialize the form state to store the input values for adding or editing a supplier.
    const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });

    // Use the useEffect hook to fetch the list of suppliers when the component mounts or when the dispatch function changes.
    useEffect(() => {
        dispatch(fetchSuppliers());
    }, [dispatch]);

    // Function to open the "Add" modal and reset the form state.
    const handleOpenAddModal = () => {
        setForm({ name: '', email: '', phone: '', address: '' });
        setOpenAddModal(true);
    };

    // Function to close the "Add" modal.
    const handleCloseAddModal = () => setOpenAddModal(false);

    // Function to open the "Edit" modal, setting the selected supplier and populating the form with the supplier's data.
    const handleOpenEditModal = (supplier) => {
        setSelectedSupplier(supplier);
        setForm(supplier);
        setOpenEditModal(true);
    };

    // Function to close the "Edit" modal.
    const handleCloseEditModal = () => setOpenEditModal(false);

    // Function to open the "Delete" modal and set the selected supplier for deletion.
    const handleOpenDeleteModal = (supplier) => {
        setSelectedSupplier(supplier);
        setOpenDeleteModal(true);
    };

    // Function to close the "Delete" modal.
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);

    // Function to handle page changes in pagination.
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Function to handle changes in the number of rows displayed per page.
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Function to handle changes to the filter input field.
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    // Function to handle changes in the form input fields.
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    // Function to handle adding a new supplier.
    const handleAddSupplier = () => {
        dispatch(addSupplier(form))
            .unwrap()
            .then(() => {
                setSnackbar({ open: true, message: 'Supplier added successfully!', severity: 'success' });
                handleCloseAddModal();
                dispatch(fetchSuppliers());

            })
            .catch((error) => {
                 console.log( "err", error);
                setSnackbar({ open: true, message: 'all field required', severity: 'error' });
            });
    };

    // Function to handle editing an existing supplier.
    const handleEditSupplier = () => {
        dispatch(updateSupplier(form))
            .unwrap()
            .then(() => {
                setSnackbar({ open: true, message: 'Supplier edited successfully!', severity: 'success' });
                handleCloseEditModal();
            })
            .catch((error) => {
                setSnackbar({ open: true, message: error || 'Error editing supplier', severity: 'error' });
            });
    };

    // Function to handle deleting a supplier by its ID.

    const handleDeleteSupplier = (supplierId) => {
        dispatch(deleteSupplier(supplierId))
            .unwrap()

            .then(() => {
                setSnackbar({ open: true, message: 'Supplier deleted successfully!', severity: 'success' });
                handleCloseDeleteModal();
            })

            .catch((error) => {
                console.log("err",  error);
                setSnackbar({ open: true, message: `Error: ${error.err}`, severity: 'error' });
            });
    };

    // Function to close the snackbar notification.
    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
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


            <Button
                variant="contained"
                color="primary"
                startIcon={<RefreshIcon />}
                onClick={()=> window.location.reload()}

                sx={{
                    backgroundColor: 'blue',
                    ':hover': {
                        backgroundColor: 'blue',
                    },
                    height: '100%',
                }}
            >
                Reload
            </Button>


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
                        Add Supplier
                    </Button>
                </Grid>
            </Grid>
            <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
                <Table hover>
                    <TableHead>
                        <TableRow>
                            <TableCell>S.No</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Actions</TableCell>
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
                            ):(


                                              filteredSuppliers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((supplier, index) => (
                                                <TableRow key={supplier._id}>
                                                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                                    <TableCell>{supplier.name}</TableCell>
                                                    <TableCell>{supplier.email}</TableCell>
                                                    <TableCell>{supplier.phone}</TableCell>
                                                    <TableCell>{supplier.address}</TableCell>
                                                    <TableCell>
                                                        <IconButton color="primary" onClick={() => handleOpenEditModal(supplier)}>
                                                            <Edit />
                                                        </IconButton>
                                                        <IconButton onClick={() => handleOpenDeleteModal(supplier)}>
                                                            <Delete sx={{ color: "red" }} />
                                                        </IconButton>
                                                    </TableCell>
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
            {/* Add Supplier Modal */}
            <Modal
                open={openAddModal}
                onClose={handleCloseAddModal}
                aria-labelledby="add-supplier-modal"
                aria-describedby="add-supplier-modal-description"
                sx={modalBackdropStyle}
            >
                <Box sx={modalStyle}>
                    <Typography id="add-supplier-modal" variant="h6" component="h2">
                        Add Supplier
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Name"
                        name="name"
                        value={form.name}
                        onChange={handleFormChange}
                        required
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
                        required
                        variant="outlined"
                        label="Email"
                        name="email"
                        value={form.email}
                        onChange={handleFormChange}
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
                        type="number"
                        required
                        fullWidth
                        variant="outlined"
                        label="Phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleFormChange}
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
                        required
                        variant="outlined"
                        label="Address"
                        name="address"
                        value={form.address}
                        onChange={handleFormChange}
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
                        sx={{
                            mt: 2,
                            backgroundColor: 'blue',
                            ':hover': {
                                backgroundColor: 'blue',
                            },
                        }}
                        onClick={handleAddSupplier}
                    >
                        Add
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{
                            mt: 2,
                            ml: 2,
                            color: 'white',
                            borderColor: 'blue',
                            ':hover': {
                                borderColor: 'blue',
                            },
                        }}
                        onClick={handleCloseAddModal}
                    >
                        Cancel
                    </Button>
                </Box>
            </Modal>
            {/* Edit Supplier Modal */}
            <Modal
                open={openEditModal}
                onClose={handleCloseEditModal}
                aria-labelledby="edit-supplier-modal"
                aria-describedby="edit-supplier-modal-description"
                sx={modalBackdropStyle}
            >
                <Box sx={modalStyle}>
                    <Typography id="edit-supplier-modal" variant="h6" component="h2">
                        Edit Supplier
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Name"
                        name="name"
                        value={form.name}
                        onChange={handleFormChange}
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
                        variant="outlined"
                        label="Email"
                        name="email"
                        value={form.email}
                        onChange={handleFormChange}
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
                        variant="outlined"
                        label="Phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleFormChange}
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
                        variant="outlined"
                        label="Address"
                        name="address"
                        value={form.address}
                        onChange={handleFormChange}
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
                        sx={{
                            mt: 2,
                            backgroundColor: 'blue',
                            ':hover': {
                                backgroundColor: 'blue',
                            },
                        }}
                        onClick={handleEditSupplier}
                    >
                        Save
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{
                            mt: 2,
                            ml: 2,
                            color: 'white',
                            borderColor: 'blue',
                            ':hover': {
                                borderColor: 'blue',
                            },
                        }}
                        onClick={handleCloseEditModal}
                    >
                        Cancel
                    </Button>
                </Box>
            </Modal>
            {/* Delete Supplier Modal */}
            <Modal
                open={openDeleteModal}
                onClose={handleCloseDeleteModal}
                aria-labelledby="delete-supplier-modal"
                aria-describedby="delete-supplier-modal-description"
                sx={modalBackdropStyle}
            >
                <Box sx={modalStyle}>
                    <Typography id="delete-supplier-modal" variant="h6" component="h2">
                        Delete Supplier
                    </Typography>
                    <Typography id="delete-supplier-modal-description" sx={{ mt: 2 }}>
                        Are you sure you want to delete {selectedSupplier?.name}?
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{
                            mt: 2,
                            backgroundColor: 'red',
                            ':hover': {
                                backgroundColor: 'red',
                            },
                        }}
                        onClick={() => handleDeleteSupplier(selectedSupplier?._id)}
                    >
                        Delete
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{
                            mt: 2,
                            ml: 2,
                            color: 'white',
                            borderColor: 'blue',
                            ':hover': {
                                borderColor: 'blue',
                            },
                        }}
                        onClick={handleCloseDeleteModal}
                    >
                        Cancel
                    </Button>
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

export default SupplierTable;
