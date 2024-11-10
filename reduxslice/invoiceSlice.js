import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define async thunks for fetching, adding, updating, and deleting invoices
export const fetchInvoices = createAsyncThunk('invoices/fetchInvoices', async () => {
  const response = await fetch(`${process.env.API}/user/invoice`);
  const data = await response.json();

     console.log("invoice data",data)

  return data;
});

export const addInvoice = createAsyncThunk('invoices/addInvoice', async (newInvoice, { rejectWithValue }) => {
  try {
    const response = await fetch(`${process.env.API}/user/invoice`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newInvoice),
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

export const updateInvoice = createAsyncThunk('invoices/updateInvoice', async (updatedInvoice) => {
  const response = await fetch(`${process.env.API}/user/invoice/${updatedInvoice._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedInvoice),
  });
  const data = await response.json();
  return data;
});

export const deleteInvoice = createAsyncThunk('invoices/deleteInvoice', async (invoiceId) => {
  await fetch(`${process.env.API}/user/invoice/${invoiceId}`, {
    method: 'DELETE',
  });
  return invoiceId;
});

const invoiceSlice = createSlice({
  name: 'invoices',
  initialState: {
    invoices: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices = action.payload;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {

        state.loading = false;
        console.log(" action.error.message", action.error.message)
        state.error = action.error.message;
      })
      .addCase(addInvoice.fulfilled, (state, action) => {
        state.invoices.push(action.payload);
      })
      .addCase(addInvoice.rejected, (state, action) => {
        state.error = action.payload || 'Error adding Invoice';
      })
      .addCase(updateInvoice.fulfilled, (state, action) => {
        const index = state.invoices.findIndex(invoice => invoice._id === action.payload._id);
        state.invoices[index] = action.payload;
      })
      .addCase(deleteInvoice.fulfilled, (state, action) => {
        state.invoices = state.invoices.filter(invoice => invoice._id !== action.payload);
      });
  },
});

export default invoiceSlice.reducer;
