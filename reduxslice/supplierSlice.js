import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Importing `createSlice` and `createAsyncThunk` from Redux Toolkit.
// `createSlice` helps in managing a piece of the Redux state and the reducers for that state.
// `createAsyncThunk` is used to handle asynchronous operations like API calls.


// Define async thunks for fetching, adding, updating, and deleting suppliers
export const fetchSuppliers = createAsyncThunk('suppliers/fetchSuppliers', async () => {
    // This thunk, named 'fetchSuppliers', will asynchronously fetch supplier data from the API.
    try {
        const response = await fetch(`${process.env.API}/user/supplier`);
        // Sending a GET request to the '/supplier' endpoint of the API.
        const data = await response.json();
        // Parsing the response as JSON to get the suppliers data.
        return data;
        // Returning the fetched data so it can be processed by the `fulfilled` case of the thunk.
    } catch (error) {
        console.error('Error fetching suppliers:', error);
        // Logging any error that occurs during the fetch operation.
        throw error;
        // Throwing the error to ensure it is handled by the `rejected` case of the thunk.
    }
});
// Exporting the `fetchSuppliers` thunk to be dispatched in the application for fetching suppliers.

export const addSupplier = createAsyncThunk('suppliers/addSupplier', async (newSupplier, { rejectWithValue }) => {
    // This thunk, named 'addSupplier', is responsible for adding a new supplier to the database.
    try {
        const response = await fetch(`${process.env.API}/user/supplier`, {
            method: 'POST',
            // Sending a POST request to the '/supplier' endpoint to create a new supplier.
            headers: {
                'Content-Type': 'application/json',
                // Setting the `Content-Type` header to 'application/json' to indicate the format of the request body.
            },
            body: JSON.stringify(newSupplier),
            // Converting the new supplier data into a JSON string and sending it in the request body.
        });

        if (!response.ok) {
            // Checking if the response status code indicates an error (non-2xx status).
            const errorData = await response.json();
            // Parsing the error response as JSON.
            return rejectWithValue(errorData);
            // Returning the parsed error data using `rejectWithValue` to handle it in the `rejected` case of the thunk.
        }

        const data = await response.json();
        // Parsing the successful response as JSON to get the newly created supplier data.
        return data;
        // Returning the created supplier data so it can be processed by the `fulfilled` case of the thunk.
    } catch (error) {
        console.error('Error adding supplier:', error);
        // Logging any error that occurs during the add operation.
        return rejectWithValue(error.message || 'Something went wrong');
        // Returning the error message using `rejectWithValue` to handle it in the `rejected` case of the thunk.
    }
});
// Exporting the `addSupplier` thunk to be dispatched in the application for adding a new supplier.

export const updateSupplier = createAsyncThunk('suppliers/updateSupplier', async (updatedSupplier, { rejectWithValue }) => {
    // This thunk, named 'updateSupplier', is responsible for updating an existing supplier's details.
    try {
        const response = await fetch(`${process.env.API}/user/supplier/${updatedSupplier?._id}`, {
            method: 'PUT',
            // Sending a PUT request to the '/supplier/:id' endpoint to update the specified supplier.
            headers: {
                'Content-Type': 'application/json',
                // Setting the `Content-Type` header to 'application/json' to indicate the format of the request body.
            },
            body: JSON.stringify(updatedSupplier),
            // Converting the updated supplier data into a JSON string and sending it in the request body.
        });

        if (!response.ok) {
            // Checking if the response status code indicates an error (non-2xx status).
            const errorData = await response.json();
            // Parsing the error response as JSON.
            return rejectWithValue(errorData);
            // Returning the parsed error data using `rejectWithValue` to handle it in the `rejected` case of the thunk.
        }

        const data = await response.json();
        // Parsing the successful response as JSON to get the updated supplier data.
        return data;
        // Returning the updated supplier data so it can be processed by the `fulfilled` case of the thunk.
    } catch (error) {
        console.error('Error updating supplier:', error);
        // Logging any error that occurs during the update operation.
        return rejectWithValue(error.message || 'Something went wrong');
        // Returning the error message using `rejectWithValue` to handle it in the `rejected` case of the thunk.
    }
});
// Exporting the `updateSupplier` thunk to be dispatched in the application for updating a supplier's details.

export const deleteSupplier = createAsyncThunk('suppliers/deleteSupplier', async (supplierId, { rejectWithValue }) => {
    // This thunk, named 'deleteSupplier', is responsible for deleting a supplier from the database.
    try {
        const response = await fetch(`${process.env.API}/user/supplier/${supplierId}`, {
            method: 'DELETE',
            // Sending a DELETE request to the '/supplier/:id' endpoint to delete the specified supplier.
        });

        if (!response.ok) {
            // Checking if the response status code indicates an error (non-2xx status).
            const errorData = await response.json();
            // Parsing the error response as JSON.
            return rejectWithValue(errorData);
            // Returning the parsed error data using `rejectWithValue` to handle it in the `rejected` case of the thunk.
        }

        return supplierId;
        // Returning the ID of the deleted supplier so it can be processed by the `fulfilled` case of the thunk.
    } catch (error) {
        console.error('Error deleting supplier:', error);
        // Logging any error that occurs during the delete operation.
        return rejectWithValue(error.message || 'Something went wrong');
        // Returning the error message using `rejectWithValue` to handle it in the `rejected` case of the thunk.
    }
});
// Exporting the `deleteSupplier` thunk to be dispatched in the application for deleting a supplier.

const supplierSlice = createSlice({
    name: 'suppliers',
    // The name of this slice of the Redux state, used as a prefix for action types.
    initialState: {
        suppliers: [],
        // The initial state for suppliers, starting with an empty array.
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
            .addCase(fetchSuppliers.pending, (state) => {
                state.loading = true;
                // When the `fetchSuppliers` thunk is pending, set `loading` to true.
            })
            .addCase(fetchSuppliers.fulfilled, (state, action) => {
                state.loading = false;
                // When the `fetchSuppliers` thunk is fulfilled, set `loading` to false.
                state.suppliers = action.payload;
                // Update the `suppliers` array with the fetched data from the action payload.
            })
            .addCase(fetchSuppliers.rejected, (state, action) => {
                state.loading = false;
                // When the `fetchSuppliers` thunk is rejected, set `loading` to false.
                state.error = action.error.message;
                // Store the error message in the `error` state.
            })
            .addCase(addSupplier.fulfilled, (state, action) => {
                state.suppliers.push(action.payload);
                // When the `addSupplier` thunk is fulfilled, add the new supplier to the `suppliers` array.
            })

          

            .addCase(updateSupplier.fulfilled, (state, action) => {
                const index = state.suppliers.findIndex(supplier => supplier._id === action.payload._id);
                // Find the index of the updated supplier in the `suppliers` array.
                if (index !== -1) {
                    state.suppliers[index] = action.payload;
                    // Replace the old supplier data with the updated data.
                }
            })
            .addCase(deleteSupplier.fulfilled, (state, action) => {
                state.suppliers = state.suppliers.filter(supplier => supplier._id !== action.payload);
                // When the `deleteSupplier` thunk is fulfilled, remove the deleted supplier from the `suppliers` array.
            })
            .addCase(addSupplier.rejected, (state, action) => {
               // console.log("Rejected", action.payload)
               
                state.error = action.payload.err || 'Error adding supplier';
                // When the `addSupplier` thunk is rejected, store the error message.
            })
            .addCase(updateSupplier.rejected, (state, action) => {
                state.error = action.payload.err || 'Error updating supplier';
                // When the `updateSupplier` thunk is rejected, store the error message.
            })
            .addCase(deleteSupplier.rejected, (state, action) => {
              
            
                state.error = action?.payload.err|| 'Error deleting supplier';
                // When the `deleteSupplier` thunk is rejected, store the error message.
            });
    },
});
// Creating a slice of the Redux state for suppliers, defining initial state and handling cases for async thunks.

export default supplierSlice.reducer;
// Exporting the reducer function generated by `supplierSlice` to be used in the Redux store.
