// Import React and useState, useEffect hooks from the React library.
import React, { useState, useEffect } from 'react';

// Import useDispatch and useSelector hooks from the React-Redux library for interacting with the Redux store.
import { useDispatch, useSelector } from 'react-redux';


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
// Import icons from Material-UI for actions like editing, deleting, and adding items.
import { Edit, Delete, Add } from '@mui/icons-material';

// Import Redux actions for fetching, adding, updating, and deleting units from the unit slice.
import { fetchUnits, addUnit, updateUnit, deleteUnit } from '@/reduxslice/unitSlice';





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

    // useState hook to control the visibility of the "Add Unit" modal.
    const [openAddModal, setOpenAddModal] = useState(false);

    // useState hook to control the visibility of the "Edit Unit" modal.
    const [openEditModal, setOpenEditModal] = useState(false);

    // useState hook to control the visibility of the "Delete Unit" modal.
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    // useState hook to store the currently selected unit for editing or deleting.
    const [selectedUnit, setSelectedUnit] = useState(null);

    // useState hook to manage the state of the snackbar notification component.
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    // useState hook to manage the input value for the new unit name.
    const [newUnitName, setNewUnitName] = useState('');

    // Function to open the "Add Unit" modal.
    const handleOpenAddModal = () => setOpenAddModal(true);

    // Function to close the "Add Unit" modal.
    const handleCloseAddModal = () => setOpenAddModal(false);

    // Function to open the "Edit Unit" modal and set the selected unit for editing.
    const handleOpenEditModal = (unit) => {
        setSelectedUnit(unit);  // Set the unit to be edited.
        setOpenEditModal(true);  // Open the edit modal.
    };

    // Function to close the "Edit Unit" modal.
    const handleCloseEditModal = () => setOpenEditModal(false);

    // Function to open the "Delete Unit" modal and set the selected unit for deletion.
    const handleOpenDeleteModal = (unit) => {
        setSelectedUnit(unit);  // Set the unit to be deleted.
        setOpenDeleteModal(true);  // Open the delete modal.
    };

    // Function to close the "Delete Unit" modal.
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);

    // Function to change the page in the pagination component.
    const handleChangePage = (event, newPage) => {
        setPage(newPage);  // Update the current page number.
    };

    // Function to change the number of rows per page in the pagination component.
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));  // Update the number of rows per page.
        setPage(0);  // Reset the page number to 0 when changing rows per page.
    };

    // Function to handle changes in the filter input, updating the filter state.
    const handleFilterChange = (event) => {
        setFilter(event.target.value);  // Update the filter with the user's input.
    };

    // Function to handle adding a new unit.
    const handleAddUnit = () => {
        dispatch(addUnit({ name: newUnitName }))  // Dispatch action to add a new unit with the specified name.
            .unwrap()  // Unwrap the promise for error handling.
            .then(() => {
                setSnackbar({ open: true, message: 'Unit added successfully!', severity: 'success' });  // Show success notification.
                handleCloseAddModal();  // Close the "Add Unit" modal.
            })
            .catch((error) => {
                setSnackbar({ open: true, message: `Error: ${error}`, severity: 'error' });  // Show error notification if the operation fails.
            });
    };

    // Function to handle editing an existing unit.
    const handleEditUnit = () => {
        if (selectedUnit) {
            dispatch(updateUnit({ ...selectedUnit, name: newUnitName }))  // Dispatch action to update the selected unit's name.
                .unwrap()  // Unwrap the promise for error handling.
                .then(() => {
                    setSnackbar({ open: true, message: 'Unit edited successfully!', severity: 'success' });  // Show success notification.
                    handleCloseEditModal();  // Close the "Edit Unit" modal.
                })
                .catch((error) => {
                    setSnackbar({ open: true, message: `Error: ${error}`, severity: 'error' });  // Show error notification if the operation fails.
                });
        }
    };

    // Function to handle deleting an existing unit.
    const handleDeleteUnit = () => {
        if (selectedUnit) {
            dispatch(deleteUnit(selectedUnit._id))  // Dispatch action to delete the selected unit by its ID.
                .unwrap()  // Unwrap the promise for error handling.
                .then(() => {
                    setSnackbar({ open: true, message: 'Unit deleted successfully!', severity: 'success' });  // Show success notification.
                    handleCloseDeleteModal();  // Close the "Delete Unit" modal.
                })
                .catch((error) => {
                    setSnackbar({ open: true, message: `Error: ${error}`, severity: 'error' });  // Show error notification if the operation fails.
                });
        }
    };

    // Function to close the snackbar notification.
    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });  // Close the snackbar by setting its `open` state to `false`.
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
                        Add Unit
                    </Button>
                </Grid>
            </Grid>
            <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
                <Table hover>
                    <TableHead>
                        <TableRow>
                            <TableCell>S.No</TableCell>
                            <TableCell>Unit Name</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUnits.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((unit,index) => (
                            <TableRow key={unit._id}>
                                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                <TableCell>{unit.name}</TableCell>
                                <TableCell>
                                    <IconButton color="primary" onClick={() => handleOpenEditModal(unit)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton onClick={() => handleOpenDeleteModal(unit)}>
                                        <Delete sx={{ color: "red" }} />
                                    </IconButton>
                                </TableCell>
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
            {/* Add Unit Modal */}
            <Modal
                open={openAddModal}
                onClose={handleCloseAddModal}
                aria-labelledby="add-unit-modal"
                aria-describedby="add-unit-modal-description"
                sx={modalBackdropStyle}
            >
                <Box sx={modalStyle}>
                    <Typography id="add-unit-modal" variant="h6" component="h2">
                        Add Unit
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Unit Name"
                        value={newUnitName}
                        onChange={(e) => setNewUnitName(e.target.value)}
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
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={handleCloseAddModal} sx={{ mr: 1 }}>Cancel</Button>
                        <Button
                            sx={{
                                backgroundColor: 'blue',
                                ':hover': {
                                    backgroundColor: 'blue',
                                },
                            }}
                            variant="contained"
                            onClick={handleAddUnit}
                        >Add</Button>
                    </Box>
                </Box>
            </Modal>
            {/* Edit Unit Modal */}
            <Modal
                open={openEditModal}
                onClose={handleCloseEditModal}
                aria-labelledby="edit-unit-modal"
                aria-describedby="edit-unit-modal-description"
                sx={modalBackdropStyle}
            >
                <Box sx={modalStyle}>
                    <Typography id="edit-unit-modal" variant="h6" component="h2">
                        Edit Unit
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Unit Name"
                        defaultValue={selectedUnit?.name}
                        onChange={(e) => setNewUnitName(e.target.value)}
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
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={handleCloseEditModal} sx={{ mr: 1 }}>Cancel</Button>
                        <Button
                            sx={{
                                backgroundColor: 'blue',
                                ':hover': {
                                    backgroundColor: 'blue',
                                },
                            }}
                            variant="contained"
                            onClick={handleEditUnit}
                        >Save</Button>
                    </Box>
                </Box>
            </Modal>
            {/* Delete Unit Modal */}
            <Modal
                open={openDeleteModal}
                onClose={handleCloseDeleteModal}
                aria-labelledby="delete-unit-modal"
                aria-describedby="delete-unit-modal-description"
                sx={modalBackdropStyle}
            >
                <Box sx={modalStyle}>
                    <Typography id="delete-unit-modal" variant="h6" component="h2">
                        Delete Unit
                    </Typography>
                    <Typography id="delete-unit-modal-description" sx={{ mt: 2 }}>
                        Are you sure you want to delete the unit "{selectedUnit?.name}"?
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={handleCloseDeleteModal} sx={{ mr: 1 }}>Cancel</Button>
                        <Button
                            sx={{
                                backgroundColor: 'red',
                                ':hover': {
                                    backgroundColor: 'red',
                                },
                            }}
                            variant="contained"
                            color="secondary"
                            onClick={handleDeleteUnit}
                        >Delete</Button>
                    </Box>
                </Box>
            </Modal>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
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
    backgroundColor: 'black',
    p: 4,
    borderRadius: 2,
    boxShadow: 130,
    width: '90%',
    maxWidth: '600px',
};
const modalBackdropStyle = {
    backdropFilter: 'blur(8px)',
};

export default UnitTable;
