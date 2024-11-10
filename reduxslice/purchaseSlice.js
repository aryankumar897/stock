import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define async thunks for fetching, adding, updating, and deleting purchases
export const fetchPurchases = createAsyncThunk('purchases/fetchPurchases', async () => {
    const response = await fetch(`${process.env.API}/user/purchases`);
    const data = await response.json();
    return data;
});

export const addPurchase = createAsyncThunk('purchases/addPurchase', async (newPurchase, { rejectWithValue }) => {
   
   
    console.log('addPurchase', newPurchase);
   
    try {
        const response = await fetch(`${process.env.API}/user/purchases`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPurchase),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message || 'Something went wrong');
    }
});

export const updatePurchase = createAsyncThunk('purchases/updatePurchase', async (updatedPurchase) => {
    const response = await fetch(`${process.env.API}/user/purchases/${updatedPurchase._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPurchase),
    });
    const data = await response.json();
    return data;
});

export const deletePurchase = createAsyncThunk('purchases/deletePurchase', async (purchaseId) => {
    await fetch(`${process.env.API}/user/purchases/${purchaseId}`, {
        method: 'DELETE',
    });
    return purchaseId;
});

const purchaseSlice = createSlice({
    name: 'purchases',
    initialState: {
        purchases: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPurchases.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPurchases.fulfilled, (state, action) => {
                state.loading = false;
              
                state.purchases = action.payload;
            })
            .addCase(fetchPurchases.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addPurchase.fulfilled, (state, action) => {

                console.log( "action"  , action.payload)
                state.purchases.push(action.payload);
           
           
            })

            .addCase(addPurchase.rejected, (state, action) => {
                console.log("action", action.payload)
                state.error = action.payload || 'Error adding Purchase ';
               
                // with the error message from the action payload.
            })


            .addCase(updatePurchase.fulfilled, (state, action) => {
                const index = state.purchases.findIndex(purchase => purchase._id === action.payload._id);
                state.purchases[index] = action.payload;
            })
            .addCase(deletePurchase.fulfilled, (state, action) => {
                state.purchases = state.purchases.filter(purchase => purchase._id !== action.payload);
            });
    },
});

export default purchaseSlice.reducer;
