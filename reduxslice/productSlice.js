import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Importing `createSlice` and `createAsyncThunk` from Redux Toolkit.
// `createSlice` helps in managing a piece of the Redux state and the reducers for that state.
// `createAsyncThunk` is used to handle asynchronous operations like API calls.


// Define async thunks for fetching, adding, updating, and deleting products

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    // This thunk, named 'fetchProducts', will asynchronously fetch product data from the API.
    const response = await fetch(`${process.env.API}/user/products`);
    // Sending a GET request to the '/products' endpoint of the API.
    const data = await response.json();
    // Parsing the response as JSON to get the products data.
    return data;
    // Returning the fetched data so it can be processed by the `fulfilled` case of the thunk.
});

export const addProduct = createAsyncThunk('products/addProduct', async (newProduct, { rejectWithValue }) => {
    // This thunk, named 'addProduct', is responsible for adding a new product to the database.
    console.log('addProduct', newProduct);
    // Logging the new product data to the console for debugging purposes.
    try {
        const response = await fetch(`${process.env.API}/user/products`, {
            method: 'POST',
            // Sending a POST request to the '/products' endpoint to create a new product.
            headers: {
                'Content-Type': 'application/json',
                // Setting the `Content-Type` header to 'application/json' to indicate the format of the request body.
            },
            body: JSON.stringify(newProduct),
            // Converting the new product data into a JSON string and sending it in the request body.
        });

        if (!response.ok) {
            // Checking if the response status code indicates an error (non-2xx status).
            const errorData = await response.json();
            // Parsing the error response as JSON.
            return rejectWithValue(errorData);
            // Returning the parsed error data using `rejectWithValue` to handle it in the `rejected` case of the thunk.
        }

        const data = await response.json();
        // Parsing the successful response as JSON to get the newly created product data.
        return data;
        // Returning the created product data so it can be processed by the `fulfilled` case of the thunk.
    } catch (error) {
        return rejectWithValue(error.message || 'Something went wrong');
        // Returning the error message using `rejectWithValue` to handle it in the `rejected` case of the thunk.
    }
});
// Exporting the `addProduct` thunk to be dispatched in the application for adding a new product.

export const updateProduct = createAsyncThunk('products/updateProduct', async (updatedProduct) => {
    // This thunk, named 'updateProduct', is responsible for updating an existing product's details.
    const response = await fetch(`${process.env.API}/user/products/${updatedProduct._id}`, {
        method: 'PUT',
        // Sending a PUT request to the '/products/:id' endpoint to update the specified product.
        headers: {
            'Content-Type': 'application/json',
            // Setting the `Content-Type` header to 'application/json' to indicate the format of the request body.
        },
        body: JSON.stringify(updatedProduct),
        // Converting the updated product data into a JSON string and sending it in the request body.
    });
    const data = await response.json();
    // Parsing the successful response as JSON to get the updated product data.
    return data;
    // Returning the updated product data so it can be processed by the `fulfilled` case of the thunk.
});
// Exporting the `updateProduct` thunk to be dispatched in the application for updating a product's details.

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId) => {
    // This thunk, named 'deleteProduct', is responsible for deleting a product from the database.
    await fetch(`${process.env.API}/user/products/${productId}`, {
        method: 'DELETE',
        // Sending a DELETE request to the '/products/:id' endpoint to delete the specified product.
    });
    return productId;
    // Returning the ID of the deleted product so it can be processed by the `fulfilled` case of the thunk.
});
// Exporting the `deleteProduct` thunk to be dispatched in the application for deleting a product.

const productSlice = createSlice({
    name: 'products',
    // The name of this slice of the Redux state, used as a prefix for action types.
    initialState: {
        products: [],
        // The initial state for products, starting with an empty array.
        loading: false,
        // A loading state to indicate if an async operation is in progress.
        error: null,
        // An error state to store any errors that occur during async operations.
    },
    reducers: {},
    // An empty `reducers` object since we're handling actions using `extraReducers` for async thunks.
    extraReducers: (builder) => {
        // `extraReducers` allows handling actions generated by createAsyncThunk.
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                // When the `fetchProducts` thunk is pending, set `loading` to true.
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                // When the `fetchProducts` thunk is fulfilled, set `loading` to false.
                state.products = action.payload;
                // Update the `products` array with the fetched data from the action payload.
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                // When the `fetchProducts` thunk is rejected, set `loading` to false.
                state.error = action.error.message;
                // Store the error message in the `error` state.
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
                // When the `addProduct` thunk is fulfilled, add the new product to the `products` array.
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex(prod => prod._id === action.payload._id);
                // Find the index of the updated product in the `products` array.
                state.products[index] = action.payload;
                // Replace the old product data with the updated data.
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(prod => prod._id !== action.payload);
                // When the `deleteProduct` thunk is fulfilled, remove the deleted product from the `products` array.
            });
    },
});
// Creating a slice of the Redux state for products, defining initial state and handling cases for async thunks.

export default productSlice.reducer;
// Exporting the reducer function generated by `productSlice` to be used in the Redux store.
