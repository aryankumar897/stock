import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Import `createSlice` and `createAsyncThunk` from Redux Toolkit. 
// `createSlice` is used to create a slice of the Redux state, 
// while `createAsyncThunk` is used to handle asynchronous operations like API calls within Redux.

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    // Define an asynchronous thunk named 'fetchCategories' for fetching category data from an API.
    try {
        const response = await fetch(`${process.env.API}/user/category`);
        // Use `fetch` to send a GET request to the API endpoint that returns categories.
        const data = await response.json();
        // Parse the JSON response body to get the data.
        return data;
        // Return the parsed data to be handled by the fulfilled state of the thunk.
    } catch (error) {
        console.log(error)
        // If an error occurs during the API request, log it to the console.
    }
});
// Export the `fetchCategories` thunk to be used in the application. This thunk will be dispatched to fetch categories.

export const addCategory = createAsyncThunk('categories/addCategory', async (newCategory, { rejectWithValue }) => {
    // Define an asynchronous thunk named 'addCategory' for adding a new category to the API.
    try {
        console.log("newCategory", newCategory)
        // Log the new category data to the console for debugging purposes.

        const response = await fetch(`${process.env.API}/user/category`, {
            method: 'POST',
            // Use `fetch` to send a POST request to the API endpoint that adds a new category.
            headers: {
                'Content-Type': 'application/json',
                // Set the `Content-Type` header to 'application/json' to indicate that the request body contains JSON.
            },
            body: JSON.stringify(newCategory),
            // Convert the new category data into a JSON string and include it in the request body.
        });
        console.log(response)
        // Log the response object to the console for debugging purposes.
        if (!response.ok) {
            // If the response status code is not in the 2xx range, handle the error.
            const errorData = await response.json();
            // Parse the error response body as JSON.
            return rejectWithValue(errorData);
            // Use `rejectWithValue` to return the error data, which will be handled by the rejected state of the thunk.
        }

        const data = await response.json();
        // If the request is successful, parse the response body as JSON to get the added category data.
        return data;
        // Return the added category data to be handled by the fulfilled state of the thunk.
    } catch (error) {
        console.error('Error adding category:', error);
        // If an error occurs during the API request, log it to the console with a specific error message.
        return rejectWithValue(error.message || 'Something went wrong');
        // Use `rejectWithValue` to return the error message, which will be handled by the rejected state of the thunk.
    }
});
// Export the `addCategory` thunk to be used in the application. This thunk will be dispatched to add a new category.

export const updateCategory = createAsyncThunk('categories/updateCategory', async (updatedCategory) => {
    // Define an asynchronous thunk named 'updateCategory' for updating an existing category via the API.
    try {
        const response = await fetch(`${process.env.API}/user/category/${updatedCategory?._id}`, {
            method: 'PUT',
            // Use `fetch` to send a PUT request to the API endpoint that updates a specific category.
            headers: {
                'Content-Type': 'application/json',
                // Set the `Content-Type` header to 'application/json' to indicate that the request body contains JSON.
            },
            body: JSON.stringify(updatedCategory),
            // Convert the updated category data into a JSON string and include it in the request body.
        });
        const data = await response.json();
        // Parse the response body as JSON to get the updated category data.
        return data;
        // Return the updated category data to be handled by the fulfilled state of the thunk.
    } catch (error) {
        console.log(error)
        // If an error occurs during the API request, log it to the console.
    }
});
// Export the `updateCategory` thunk to be used in the application. This thunk will be dispatched to update a category.

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (categoryId) => {
    // Define an asynchronous thunk named 'deleteCategory' for deleting a category via the API.
    try {
        const response = await fetch(`${process.env.API}/user/category/${categoryId}`, {
            method: 'DELETE',
            // Use `fetch` to send a DELETE request to the API endpoint that deletes a specific category.
        });
        return categoryId;
        // Return the ID of the deleted category to be handled by the fulfilled state of the thunk.
    } catch (error) {
        console.log(error)
        // If an error occurs during the API request, log it to the console.
    }
});
// Export the `deleteCategory` thunk to be used in the application. This thunk will be dispatched to delete a category.

const categorySlice = createSlice({
    name: 'categories',
    // The name of the slice, used to identify the slice in the Redux store.
    initialState: {
        categories: [],
        // Initialize the categories state as an empty array.
        loading: false,
        // Initialize the loading state as false. This will be used to track when an async action is in progress.
        error: null,
        // Initialize the error state as null. This will be used to store any errors that occur during async actions.
    },
    reducers: {},
    // An empty `reducers` object. You can add synchronous reducers here if needed.
    extraReducers: (builder) => {
        // Use `extraReducers` to handle actions generated by createAsyncThunk.
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                // When the `fetchCategories` thunk is pending (i.e., the API request is in progress), 
                // set the loading state to true.
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                // When the `fetchCategories` thunk is fulfilled (i.e., the API request was successful), 
                // set the loading state to false.
                state.categories = action.payload;

                
                // Update the categories state with the fetched categories data from the action payload.
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                // When the `fetchCategories` thunk is rejected (i.e., the API request failed), 
                // set the loading state to false.
                state.error = action.error.message;
                // Update the error state with the error message from the action.
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                
                 console.log(action)
                state.categories.push(action.payload);

                
                // When the `addCategory` thunk is fulfilled, add the new category data 
                // from the action payload to the categories array.
          
            })



            
            .addCase(updateCategory.fulfilled, (state, action) => {
                console.log("update", action)
                // Log the action object to the console for debugging purposes.
                const index = state.categories.findIndex(cat => cat._id === action.payload._id);
                // Find the index of the category that was updated by matching the `_id`.
                state.categories[index] = action.payload;
                // Replace the old category data with the updated category data in the categories array.
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                console.log("action", action.payload);
                // Log the action payload (category ID) to the console for debugging purposes.
                state.categories = state.categories.filter(cat => cat._id !== action.payload);
                // Remove the deleted category from the categories array by filtering out the matching `_id`.
            });
    },
});
// Create a slice for category-related state management. 
// Define the initial state and handle different cases for each async thunk 
// (pending, fulfilled, rejected) using `extraReducers` to update the state.

export default categorySlice.reducer;
// Export the reducer function generated by `categorySlice` for use in the Redux store.
