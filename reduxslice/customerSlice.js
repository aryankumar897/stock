import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Import `createSlice` and `createAsyncThunk` from Redux Toolkit. 
// `createSlice` is used to create a slice of the Redux state, and `createAsyncThunk` 
// is used to handle asynchronous operations like API requests within Redux.

export const fetchCustomers = createAsyncThunk('customers/fetchCustomers', async (_, { rejectWithValue }) => {
    // Define an asynchronous thunk named 'fetchCustomers' to fetch customer data from the API.
    try {
        const response = await fetch(`${process.env.API}/user/customers`);
        // Send a GET request to the customers API endpoint.
        if (!response.ok) {
            // If the response status code is not in the 2xx range, handle the error.
            const errorData = await response.json();
            // Parse the error response body as JSON.
            return rejectWithValue(errorData);
            // Use `rejectWithValue` to return the error data, which will be handled by the rejected state of the thunk.
        }
        const data = await response.json();
        // Parse the successful response body as JSON to get the customer data.
        console.log("cust", data)
        // Log the fetched customer data to the console for debugging purposes.
        return data;
        // Return the fetched customer data to be handled by the fulfilled state of the thunk.
    } catch (error) {
        return rejectWithValue(error.message || 'Something went wrong');
        // If an error occurs during the API request, return the error message using `rejectWithValue`.
    }
});
// Export the `fetchCustomers` thunk to be used in the application. 
// This thunk will be dispatched to fetch customers from the API.

export const addCustomer = createAsyncThunk('customers/addCustomer', async (newCustomer, { rejectWithValue }) => {
    // Define an asynchronous thunk named 'addCustomer' to add a new customer via the API.
    try {
        console.log('addCustomer: ', newCustomer)
        // Log the new customer data to the console for debugging purposes.

        const response = await fetch(`${process.env.API}/user/customers`, {
            method: 'POST',
            // Send a POST request to the customers API endpoint to add a new customer.
            headers: {
                'Content-Type': 'application/json',
                // Set the `Content-Type` header to 'application/json' to indicate that the request body contains JSON.
            },
            body: JSON.stringify(newCustomer),
            // Convert the new customer data into a JSON string and include it in the request body.
        });

        if (!response.ok) {
            // If the response status code is not in the 2xx range, handle the error.
            const errorData = await response.json();
            // Parse the error response body as JSON.
            return rejectWithValue(errorData);
            // Use `rejectWithValue` to return the error data, which will be handled by the rejected state of the thunk.
        }

        const data = await response.json();
        // Parse the successful response body as JSON to get the added customer data.
        return data;
        // Return the added customer data to be handled by the fulfilled state of the thunk.
    } catch (error) {
        return rejectWithValue(error.message || 'Something went wrong');
        // If an error occurs during the API request, return the error message using `rejectWithValue`.
    }
});
// Export the `addCustomer` thunk to be used in the application. 
// This thunk will be dispatched to add a new customer to the API.

export const updateCustomer = createAsyncThunk('customers/updateCustomer', async (updatedCustomer, { rejectWithValue }) => {
    // Define an asynchronous thunk named 'updateCustomer' to update an existing customer via the API.
    try {
        console.log('Customer updated,', updatedCustomer)
        // Log the updated customer data to the console for debugging purposes.

        const response = await fetch(`${process.env.API}/user/customers/${updatedCustomer._id}`, {
            method: 'PUT',
            // Send a PUT request to the customers API endpoint to update the specified customer.
            headers: {
                'Content-Type': 'application/json',
                // Set the `Content-Type` header to 'application/json' to indicate that the request body contains JSON.
            },
            body: JSON.stringify(updatedCustomer),
            // Convert the updated customer data into a JSON string and include it in the request body.
        });

        if (!response.ok) {
            // If the response status code is not in the 2xx range, handle the error.
            const errorData = await response.json();
            // Parse the error response body as JSON.
            return rejectWithValue(errorData);
            // Use `rejectWithValue` to return the error data, which will be handled by the rejected state of the thunk.
        }

        const data = await response.json();
        // Parse the successful response body as JSON to get the updated customer data.
        return data;
        // Return the updated customer data to be handled by the fulfilled state of the thunk.
    } catch (error) {
        return rejectWithValue(error.message || 'Something went wrong');
        // If an error occurs during the API request, return the error message using `rejectWithValue`.
    }
});
// Export the `updateCustomer` thunk to be used in the application. 
// This thunk will be dispatched to update an existing customer in the API.

export const deleteCustomer = createAsyncThunk('customers/deleteCustomer', async (customerId, { rejectWithValue }) => {
    // Define an asynchronous thunk named 'deleteCustomer' to delete a customer via the API.
    try {
        const response = await fetch(`${process.env.API}/user/customers/${customerId}`, {
            method: 'DELETE',
            // Send a DELETE request to the customers API endpoint to delete the specified customer.
        });

        if (!response.ok) {
            // If the response status code is not in the 2xx range, handle the error.
            const errorData = await response.json();
            // Parse the error response body as JSON.
            return rejectWithValue(errorData);
            // Use `rejectWithValue` to return the error data, which will be handled by the rejected state of the thunk.
        }

        return customerId;
        // Return the ID of the deleted customer to be handled by the fulfilled state of the thunk.
    } catch (error) {
        return rejectWithValue(error.message || 'Something went wrong');
        // If an error occurs during the API request, return the error message using `rejectWithValue`.
    }
});
// Export the `deleteCustomer` thunk to be used in the application. 
// This thunk will be dispatched to delete a customer from the API.

const customerSlice = createSlice({
    name: 'customers',
    // The name of the slice, which will be used as a prefix for the generated action types.
    initialState: {
        customers: [],
        // Initialize the customers state as an empty array.
        loading: false,
        // Initialize the loading state as false. This will be used to indicate when an async action is in progress.
        error: null,
        // Initialize the error state as null. This will be used to store any errors that occur during async actions.
    },
    reducers: {},
    // An empty `reducers` object. You can add synchronous reducers here if needed.
    extraReducers: (builder) => {
        // Use `extraReducers` to handle actions generated by createAsyncThunk.
        builder
            .addCase(fetchCustomers.pending, (state) => {
                state.loading = true;
                // When the `fetchCustomers` thunk is pending (i.e., the API request is in progress), 
                // set the loading state to true.
            })
            .addCase(fetchCustomers.fulfilled, (state, action) => {
                state.loading = false;
                // When the `fetchCustomers` thunk is fulfilled (i.e., the API request was successful), 
                // set the loading state to false.
                state.customers = action.payload;
                // Update the customers state with the fetched customer data from the action payload.
            })
            .addCase(fetchCustomers.rejected, (state, action) => {
                state.loading = false;
                // When the `fetchCustomers` thunk is rejected (i.e., the API request failed), 
                // set the loading state to false.
                state.error = action.payload;
                // Update the error state with the error message from the action payload.
            })
            .addCase(addCustomer.fulfilled, (state, action) => {
                state.customers.push(action.payload);
                // When the `addCustomer` thunk is fulfilled, add the new customer data 
                // from the action payload to the customers array.
            })
            .addCase(addCustomer.rejected, (state, action) => {
                state.error = action.payload;
                // When the `addCustomer` thunk is rejected, update the error state 
                // with the error message from the action payload.
            })
            .addCase(updateCustomer.fulfilled, (state, action) => {
                const index = state.customers.findIndex(cust => cust._id === action.payload._id);
                // Find the index of the customer that was updated by matching the `_id`.
                state.customers[index] = action.payload;
                // Replace the old customer data with the updated customer data in the customers array.
            })
            .addCase(updateCustomer.rejected, (state, action) => {
                state.error = action.payload;
                // When the `updateCustomer` thunk is rejected, update the error state 
                // with the error message from the action payload.
            })
            .addCase(deleteCustomer.fulfilled, (state, action) => {
                state.customers = state.customers.filter(cust => cust._id !== action.payload);
                // When the `deleteCustomer` thunk is fulfilled, remove the deleted customer 
                // from the customers array by filtering out the matching `_id`.
            })
            .addCase(deleteCustomer.rejected, (state, action) => {
                state.error = action.payload;
                // When the `deleteCustomer` thunk is rejected, update the error state 
                // with the error message from the action payload.
            });
    },
});
// Create a slice for customer-related state management. 
// Define the initial state and handle different cases for each async thunk 
// (pending, fulfilled, rejected) using `extraReducers` to update the state.

export default customerSlice.reducer;
// Export the reducer function generated by `customerSlice` for use in the Redux store.
