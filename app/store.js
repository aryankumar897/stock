"use client"

import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '@/reduxslice/categorySlice';
import unitReducer from '@/reduxslice/unitSlice';

import productReducer from '@/reduxslice/productSlice'
import supplierReducer from '@/reduxslice/supplierSlice'

import customerReducer from '@/reduxslice/customerSlice'
import purchaseReducer from '@/reduxslice/purchaseSlice'

import invoiceReducer from '@/reduxslice/invoiceSlice'


export const store = configureStore({
    reducer: {
        categories: categoryReducer,
        units: unitReducer,
        products: productReducer,
        suppliers: supplierReducer,
        customers: customerReducer,
        purchases:purchaseReducer,
       invoices :invoiceReducer
    },
});
