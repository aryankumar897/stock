import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Import `createSlice` and `createAsyncThunk` from Redux Toolkit. 
// `createSlice` is used to create a slice of the Redux state, 
// and `createAsyncThunk` handles asynchronous operations like API requests.

export const fetchUnits = createAsyncThunk('units/fetchUnits', async () => {
    // Define an asynchronous thunk named 'fetchUnits' to fetch units from the API.
    try {
        const response = await fetch(`${process.env.API}/user/unit`);
        // Send a GET request to the 'unit' API endpoint.
        const data = await response.json();
        // Parse the response body as JSON to get the units data.
        return data;
        // Return the units data to be handled by the fulfilled state of the thunk.
    } catch (error) {
        console.error('Error fetching units:', error);
        // Log any errors encountered during the fetch to the console.
        throw error;
        // Rethrow the error to ensure it is caught by the rejected case of the thunk.
    }
});
// Export the `fetchUnits` thunk to be used in the application. 
// This thunk will be dispatched to fetch units from the API.

export const addUnit = createAsyncThunk('units/addUnit', async (newUnit, { rejectWithValue }) => {
    // Define an asynchronous thunk named 'addUnit' to add a new unit via the API.
    try {
        const response = await fetch(`${process.env.API}/user/unit`, {
            method: 'POST',
            // Send a POST request to the 'unit' API endpoint to add a new unit.
            headers: {
                'Content-Type': 'application/json',
                // Set the `Content-Type` header to 'application/json' to indicate that the request body contains JSON.
            },
            body: JSON.stringify(newUnit),
            // Convert the new unit data into a JSON string and include it in the request body.
        });

        if (!response.ok) {
            // If the response status code is not in the 2xx range, handle the error.
            const errorData = await response.json();
            // Parse the error response body as JSON.
            return rejectWithValue(errorData);
            // Use `rejectWithValue` to return the error data, which will be handled by the rejected state of the thunk.
        }

        const data = await response.json();
        
        // Parse the successful response body as JSON to get the added unit data.
        return data;
        // Return the added unit data to be handled by the fulfilled state of the thunk.
    } catch (error) {
        console.error('Error adding unit:', error);
        // Log any errors encountered during the add operation to the console.
        return rejectWithValue(error.message || 'Something went wrong');
        // If an error occurs, return the error message using `rejectWithValue`.
    }
});
// Export the `addUnit` thunk to be used in the application. 
// This thunk will be dispatched to add a new unit to the API.

export const updateUnit = createAsyncThunk('units/updateUnit', async (updatedUnit, { rejectWithValue }) => {
    // Define an asynchronous thunk named 'updateUnit' to update an existing unit via the API.
    try {
        const response = await fetch(`${process.env.API}/user/unit/${updatedUnit?._id}`, {
            method: 'PUT',
            // Send a PUT request to the 'unit' API endpoint to update the specified unit.
            headers: {
                'Content-Type': 'application/json',
                // Set the `Content-Type` header to 'application/json' to indicate that the request body contains JSON.
            },
            body: JSON.stringify(updatedUnit),
            // Convert the updated unit data into a JSON string and include it in the request body.
        });

        if (!response.ok) {
            // If the response status code is not in the 2xx range, handle the error.
            const errorData = await response.json();
            // Parse the error response body as JSON.
            return rejectWithValue(errorData);
            // Use `rejectWithValue` to return the error data, which will be handled by the rejected state of the thunk.
        }

        const data = await response.json();
        // Parse the successful response body as JSON to get the updated unit data.
        return data;
        // Return the updated unit data to be handled by the fulfilled state of the thunk.
    } catch (error) {
        console.error('Error updating unit:', error);
        // Log any errors encountered during the update operation to the console.
        return rejectWithValue(error.message || 'Something went wrong');
        // If an error occurs, return the error message using `rejectWithValue`.
    }
});
// Export the `updateUnit` thunk to be used in the application. 
// This thunk will be dispatched to update an existing unit in the API.

export const deleteUnit = createAsyncThunk('units/deleteUnit', async (unitId, { rejectWithValue }) => {
    // Define an asynchronous thunk named 'deleteUnit' to delete a unit via the API.
    try {
        const response = await fetch(`${process.env.API}/user/unit/${unitId}`, {
            method: 'DELETE',
            // Send a DELETE request to the 'unit' API endpoint to delete the specified unit.
        });

        if (!response.ok) {
            // If the response status code is not in the 2xx range, handle the error.
            const errorData = await response.json();
            // Parse the error response body as JSON.
            return rejectWithValue(errorData);
            // Use `rejectWithValue` to return the error data, which will be handled by the rejected state of the thunk.
        }

        return unitId;
        // Return the ID of the deleted unit to be handled by the fulfilled state of the thunk.
    } catch (error) {
        console.error('Error deleting unit:', error);
        // Log any errors encountered during the delete operation to the console.
        return rejectWithValue(error.message || 'Something went wrong');
        // If an error occurs, return the error message using `rejectWithValue`.
    }
});
// Export the `deleteUnit` thunk to be used in the application. 
// This thunk will be dispatched to delete a unit from the API.

const unitSlice = createSlice({
    name: 'units',
    // The name of the slice, which will be used as a prefix for the generated action types.
    initialState: {
        units: [],
        // Initialize the units state as an empty array.
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
            .addCase(fetchUnits.pending, (state) => {
                state.loading = true;
                // When the `fetchUnits` thunk is pending (i.e., the API request is in progress), 
                // set the loading state to true.
            })
            .addCase(fetchUnits.fulfilled, (state, action) => {
                state.loading = false;
                // When the `fetchUnits` thunk is fulfilled (i.e., the API request was successful), 
                // set the loading state to false.
                state.units = action.payload;
                // Update the units state with the fetched units data from the action payload.
            })
            .addCase(fetchUnits.rejected, (state, action) => {
                state.loading = false;
                // When the `fetchUnits` thunk is rejected (i.e., the API request failed), 
                // set the loading state to false.
                state.error = action.error.message;
                // Update the error state with the error message from the action payload.
            })
            .addCase(addUnit.fulfilled, (state, action) => {
                state.units.push(action.payload);
                // When the `addUnit` thunk is fulfilled, add the new unit data 
                // from the action payload to the units array.
            })
            .addCase(updateUnit.fulfilled, (state, action) => {
                const index = state.units.findIndex(unit => unit._id === action.payload._id);
                // Find the index of the unit that was updated by matching the `_id`.
                if (index !== -1) {
                    state.units[index] = action.payload;
                    // Replace the old unit data with the updated unit data in the units array.
                }
            })
            .addCase(deleteUnit.fulfilled, (state, action) => {
                state.units = state.units.filter(unit => unit._id !== action.payload);
                // When the `deleteUnit` thunk is fulfilled, remove the deleted unit 
                // from the units array by filtering out the matching `_id`.
            })
            .addCase(addUnit.rejected, (state, action) => {
                state.error = action.payload || 'Error adding unit';
                // When the `addUnit` thunk is rejected, update the error state 
                // with the error message from the action payload.
            })
            .addCase(updateUnit.rejected, (state, action) => {
                state.error = action.payload || 'Error updating unit';
                // When the `updateUnit` thunk is rejected, update the error state 
                // with the error message from the action payload.
            })
            .addCase(deleteUnit.rejected, (state, action) => {
                state.error = action.payload || 'Error deleting unit';
                // When the `deleteUnit` thunk is rejected, update the error state 
                // with the error message from the action payload.
            });
    },
});
// Create a slice for unit-related state management. 
// Define the initial state and handle different cases for each async thunk 
// (pending, fulfilled, rejected) using `extraReducers` to update the state.

export default unitSlice.reducer;
// Export the reducer function generated by `unitSlice` for use in the Redux store.
