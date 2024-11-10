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
    Button,            
     // A button component for user interactions.
    TextField,         
     // An input field component for text data.
    Typography,         
    // A component for displaying text with different styles.
    IconButton,         
    // A button component that displays an icon, typically used for actions like edit/delete.
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
    Modal,             
     // A component for creating modal dialogs.
    Snackbar,           
    // A component for displaying brief messages (toasts) at the bottom of the screen.
    Alert,              
    // A component for showing alerts with different severity levels.
    Grid,              
     // A component for creating responsive grid layouts.
    MenuItem,          
     // A component for individual items in a dropdown menu.
    Select,            
     // A component for creating dropdown select menus.
    InputLabel,         
    // A label component for input elements.
    FormControl         // A wrapper component that provides context to form controls.
} from '@mui/material';

// Importing icons from Material-UI for use in UI elements like buttons.
import { Edit, Delete, Add } from '@mui/icons-material';

// Importing Redux actions related to products. 
// These actions are used to interact with the product-related state, 
// such as fetching, adding, updating, and deleting products.
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '@/reduxslice/productSlice';

// Importing an action to fetch units, which are likely related to products (e.g., unit of measurement).
import { fetchUnits } from '@/reduxslice/unitSlice';

// Importing an action to fetch suppliers, which may be linked to the products.
import { fetchSuppliers } from '@/reduxslice/supplierSlice';

// Importing an action to fetch categories, which may be used to categorize the products.
import { fetchCategories } from '@/reduxslice/categorySlice';

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
        dispatch(fetchUnits());        // Dispatch action to fetch units.
        dispatch(fetchSuppliers());    // Dispatch action to fetch suppliers.
        dispatch(fetchCategories());   // Dispatch action to fetch categories.
    }, [dispatch]);  // Dependencies array ensures actions are dispatched only when `dispatch` changes (e.g., component mount).

    // State to manage the current page in the table.
    const [page, setPage] = useState(0);

    // State to manage the number of rows per page in the table.
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // State to manage the filter text for searching products.
    const [filter, setFilter] = useState('');

    // State to control whether the "Add Product" modal is open or closed.
    const [openAddModal, setOpenAddModal] = useState(false);

    // State to control whether the "Edit Product" modal is open or closed.
    const [openEditModal, setOpenEditModal] = useState(false);

    // State to control whether the "Delete Product" modal is open or closed.
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    // State to store the currently selected product for editing or deleting.
    const [selectedProduct, setSelectedProduct] = useState(null);

    // State to control the snackbar (toast notification) visibility, message, and severity (e.g., success, error).
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    // State to store new product details for the "Add Product" form.
    const [newProduct, setNewProduct] = useState({ productName: '', supplierNameId: '', unitNameId: '', categoryNameId: '' });

    // State to store edited product details for the "Edit Product" form.
    const [editProduct, setEditProduct] = useState({ productName: '', supplierNameId: '', unitNameId: '', categoryNameId: '' });

    // Function to open the "Add Product" modal.
    const handleOpenAddModal = () => setOpenAddModal(true);

    // Function to close the "Add Product" modal.
    const handleCloseAddModal = () => setOpenAddModal(false);

    // Function to open the "Edit Product" modal and populate it with the selected product's details.
    const handleOpenEditModal = (product) => {
        setEditProduct({ ...product });    // Set the selected product's details in state.
        setSelectedProduct(product);       // Set the selected product in state.
        setOpenEditModal(true);            // Open the edit modal.
    };

    // Function to close the "Edit Product" modal.
    const handleCloseEditModal = () => setOpenEditModal(false);

    // Function to open the "Delete Product" modal and select the product to delete.
    const handleOpenDeleteModal = (product) => {
        setSelectedProduct(product);       // Set the selected product in state.
        setOpenDeleteModal(true);          // Open the delete modal.
    };

    // Function to close the "Delete Product" modal.
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);

    // Function to handle pagination changes in the table.
    const handleChangePage = (event, newPage) => {
        setPage(newPage);  // Update the current page state.
    };

    // Function to change the number of rows per page in the table.
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10)); // Update the rows per page state.
        setPage(0); // Reset to the first page.
    };

    // Function to handle filter input changes.
    const handleFilterChange = (event) => {
        setFilter(event.target.value);  // Update the filter state with the input value.
    };

    // Function to handle adding a new product.
    const handleAddProduct = () => {
        dispatch(addProduct({ ...newProduct }))  // Dispatch action to add a new product.
            .unwrap()  // Unwrap the promise returned by the thunk action.
            .then(() => {
                setSnackbar({ open: true, message: 'Product added successfully!', severity: 'success' }); // Show success snackbar.
                handleCloseAddModal();  // Close the "Add Product" modal.
                dispatch(fetchProducts());  // Refresh the product list.
            }).catch((error) => {
                setSnackbar({ open: true, message: `Error: ${error}`, severity: 'error' }); // Show error snackbar.
            });
    };

    // Function to handle editing an existing product.
    const handleEditProduct = () => {
        dispatch(updateProduct({ ...editProduct }))  // Dispatch action to update the product.
            .unwrap()  // Unwrap the promise returned by the thunk action.
            .then(() => {
                setSnackbar({ open: true, message: 'Product edited successfully!', severity: 'success' }); // Show success snackbar.
                handleCloseEditModal();  // Close the "Edit Product" modal.
                dispatch(fetchProducts());  // Refresh the product list.
            }).catch((error) => {
                setSnackbar({ open: true, message: `Error: ${error}`, severity: 'error' }); // Show error snackbar.
            });
    };

    // Function to handle deleting a product.
    const handleDeleteProduct = () => {
        
        dispatch(deleteProduct(selectedProduct._id))  // Dispatch action to delete the selected product.
            .unwrap()  // Unwrap the promise returned by the thunk action.
            .then(() => {
                setSnackbar({ open: true, message: 'Product deleted successfully!', severity: 'success' }); // Show success snackbar.
                handleCloseDeleteModal();  // Close the "Delete Product" modal.
                dispatch(fetchProducts());  // Refresh the product list.
            }).catch((error) => {
                setSnackbar({ open: true, message: `Error: ${error}`, severity: 'error' }); // Show error snackbar.
            });
   
   
        };

    // Function to close the snackbar (toast notification).
    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });  // Set snackbar state to closed.
    };

    // Filter the products based on the search filter input.
    const filteredProducts = products.filter((product) =>
        product.productName.toLowerCase().includes(filter.toLowerCase()) // Check if product name includes the filter string.
    );

    // Dummy data for unit, supplier, and category names for dropdowns in the form.
    const unitNames = ['Unit 1', 'Unit 2', 'Unit 3'];
    const supplierNames = ['Supplier A', 'Supplier B', 'Supplier C'];
    const categoryNames = ['Category X', 'Category Y', 'Category Z'];

    // Access categories from the Redux store.
    const { categories } = useSelector((state) => state.categories);

    // Access units from the Redux store.
    const { units } = useSelector((state) => state.units);

    // Access suppliers from the Redux store.
    const { suppliers } = useSelector(state => state.suppliers);

    // Log the fetched categories, units, and suppliers to the console for debugging purposes.
    console.log({ categories, units, suppliers });

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
                        Add Product
                    </Button>
                </Grid>
            </Grid>
            <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
                <Table hover>
                    <TableHead>
                        <TableRow style={{ borderBottom: "6px solid blue" }}>
                            <TableCell>S.No</TableCell>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Supplier Name</TableCell>
                            <TableCell>Unit Name</TableCell>
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


                        filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product,index) => (
                            <TableRow key={product._id} style={{ borderBottom: "3px solid blue" }}>
                                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                <TableCell>{product?.productName}</TableCell>
                                <TableCell>{product?.supplierNameId?.name}</TableCell>
                                <TableCell>{product?.unitNameId?.name}</TableCell>
                                <TableCell>{product?.categoryNameId?.name}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleOpenEditModal(product)} style={{ color: "blue" }}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton onClick={() => handleOpenDeleteModal(product)} style={{ color: "blue" }}>
                                        <Delete sx={{ color: "red" }} />
                                    </IconButton>
                                </TableCell>
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
                sx={{backgroundColor:"white"}}
            />

            {/* Add Product Modal */}
            <Modal
                sx={modalBackdropStyle}
             open={openAddModal}
              onClose={handleCloseAddModal}
              >
                <Box
                    sx={modalStyle}
                >
                    <Typography variant="h6" component="h2">
                        Add Product
                    </Typography>
                    <TextField
                        fullWidth
                        label="Product Name"
                        variant="outlined"
                        value={newProduct.productName}
                        onChange={(e) => setNewProduct({ ...newProduct, productName: e.target.value })}
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
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Supplier Name</InputLabel>
                        <Select
                            value={newProduct.supplierNameId}
                            onChange={(e) => setNewProduct({ ...newProduct, supplierNameId: e.target.value })}
                      
                            sx={{
                                                         mt: 3,
                                                         color: "white",
                                                         '.MuiOutlinedInput-notchedOutline': {
                                                             borderColor: 'blue',
                                                         },
                                                     '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: 'blue',
                                                        },
                                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: 'blue',
                                                        },
                                                        '.MuiSvgIcon-root ': {
                                                            fill: "white !important",
                                                        }
                                                     }}
                      
                        >
                            {suppliers&&  suppliers?.map((name, index) => (
                                <MenuItem key={index} value={name._id}>{name.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Unit Name</InputLabel>
                        <Select
                            value={newProduct.unitNameId}
                            onChange={(e) => setNewProduct({ ...newProduct, unitNameId: e.target.value })}
                            sx={{
                                mt: 3,
                                color: "white",
                                '.MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'blue',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'blue',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'blue',
                                },
                                '.MuiSvgIcon-root ': {
                                    fill: "white !important",
                                }
                            }}
                       
                       
                        >
                            {units&& units?.map((name, index) => (
                                <MenuItem key={index} value={name._id}>{name.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Category Name</InputLabel>
                        <Select
                            value={newProduct.categoryNameId}
                            onChange={(e) => setNewProduct({ ...newProduct, categoryNameId: e.target.value })}
                      
                            sx={{
                                mt: 3,
                                color: "white",
                                '.MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'blue',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'blue',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'blue',
                                },
                                '.MuiSvgIcon-root ': {
                                    fill: "white !important",
                                }
                            }}
                      
                        >
                            {categories&&  categories?.map((name, index) => (
                                <MenuItem key={index} value={name._id}>{name.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleAddProduct}
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
            </Modal>

            {/* Edit Product Modal */}
            <Modal 
            open={openEditModal}
             onClose={handleCloseEditModal}
                sx={modalBackdropStyle}
             >

                <Box
                    sx={modalStyle}
                >
                    <Typography variant="h6" component="h2">
                        Edit Product
                       

                    </Typography>
                    <TextField
                        fullWidth
                        label="Product Name"
                        variant="outlined"
                        value={editProduct.productName}
                        onChange={(e) => setEditProduct({ ...editProduct, productName: e.target.value })}
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
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Supplier Name</InputLabel>
                        <Select
                            value={editProduct.supplierNameId._id}

                            onChange={(e) => {
                                const selectedSupplier = suppliers.find(supplier => supplier._id === e.target.value);
                                setEditProduct({ ...editProduct, supplierNameId: selectedSupplier });
                            }}
                          //  onChange={(e) => setEditProduct({ ...editProduct, supplierNameId: e.target.value })}
                           
                            sx={{
                                mt: 3,
                                color: "white",
                                '.MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'blue',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'blue',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'blue',
                                },
                                '.MuiSvgIcon-root ': {
                                    fill: "white !important",
                                } ,
                                '.MuiSelect-select': {
                                    color: 'white', // Change the color of the selected value
                                },
                            }}
                      
                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        bgcolor: 'black',
                                        '.MuiMenuItem-root': {
                                            color: 'white',
                                        }
                                    }
                                }
                            }}
                        >
                        


                            {suppliers.map((name, index) => (
                                <MenuItem key={index} value={name._id}>{name.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Unit Name</InputLabel>
                        <Select
                            value={editProduct.unitNameId._id}

                            onChange={(e) => {
                                const selectedUnit = units.find(unit => unit._id === e.target.value);
                                setEditProduct({ ...editProduct, unitNameId: selectedUnit });
                            }}
                          
                            sx={{
                                mt: 3,
                                color: "white",
                                '.MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'blue',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'blue',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'blue',
                                },
                                '.MuiSvgIcon-root ': {
                                    fill: "white !important",
                                }
                            }}
                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        bgcolor: 'black',
                                        '.MuiMenuItem-root': {
                                            color: 'white',
                                        }
                                    }
                                }
                            }}
                      
                        >


                            {units.map((name, index) => (
                                <MenuItem key={index} value={name._id}>{name.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel 
                        
            
                        
                        
                        >Category Name</InputLabel>
                        <Select

                            value={editProduct?.categoryNameId?._id}
                          
                            onChange={(e) => {
                                const selectedCategory = categories.find(category => category._id === e.target.value);
                                setEditProduct({ ...editProduct, categoryNameId: selectedCategory });
                            }}
                           
                            sx={{
                                mt: 3,
                                color: "white !important",
                                '.MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'blue',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'blue',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'blue',
                                },
                                '.MuiSvgIcon-root ': {
                                    fill: "white !important",
                                    color: "white !important",
                                }
                            }}

                        >
                            {categories&&   categories.map((name, index) => (
                                <MenuItem key={index} value={name?._id}
                                  
                                
                                
                                >{name.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleEditProduct}
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
            </Modal>

            {/* Delete Product Modal */}
            <Modal 
                sx={modalBackdropStyle}
            open={openDeleteModal}
             onClose={handleCloseDeleteModal}
             >
                <Box

                    sx={modalStyle}

                >
                    <Typography variant="h6" component="h2">
                        Delete Product
                    </Typography>
                    <Typography sx={{ mb: 2 }}>
                        Are you sure you want to delete{'  '} {selectedProduct?.productName}?
                    </Typography>
                    <Button
                       
                        variant="contained"
                        onClick={handleDeleteProduct}
                        sx={{
                            color: 'white',
                            backgroundColor: 'red',
                            ':hover': {
                                color: 'white',
                                backgroundColor: 'red',
                            },
                        }}
                    >
                        Delete
                    </Button>
                </Box>
            </Modal>

            {/* Snackbar for notifications */}
            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
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
    width: 800,
    bgcolor: '#000',
    boxShadow: 24,
    p: 4,
    color: 'white',
};

const modalBackdropStyle = {
    backdropFilter: 'blur(3px)',
};
export default ProductTable;
