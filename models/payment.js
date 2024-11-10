import mongoose from "mongoose";
const Schema = mongoose.Schema;

import Customer from "./customers";
import Invoice from "./invoice";
const PaymentSchema = new Schema({
  invoice_id: {
    // Defining the `supplier_id` field to store a reference to the `Supplier` model.
    type: mongoose.Schema.Types.ObjectId,
    // The type is an ObjectId, which is a special data type in MongoDB for referencing documents.
    ref: "Invoice",
    // The `ref` option tells Mongoose to populate this field with data from the `Supplier` model.

  },
  customer_id: {
    // Defining the `supplier_id` field to store a reference to the `Supplier` model.
    type: mongoose.Schema.Types.ObjectId,
    // The type is an ObjectId, which is a special data type in MongoDB for referencing documents.
    ref: "Customer",
    // The `ref` option tells Mongoose to populate this field with data from the `Supplier` model.

  },
  paid_status: {
    type: String,
   
    required: false, 
  },
  paid_amount: {
    type: Number,
    required: false,  
  },
  due_amount: {
    type: Number,
    required: false,  
  },
  total_amount: {
    type: Number,
    required: false,  
  },
  discount_amount: {
    type: Number,
    required: false,  
  },
}, { timestamps: true });  // This adds createdAt and updatedAt fields

export default mongoose.models.Payment ||  mongoose.model('Payment', PaymentSchema);
