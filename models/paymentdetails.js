import mongoose from "mongoose";
const Schema = mongoose.Schema;
import Invoice from "./invoice";
const PaymentDetailsSchema = new Schema({
 
 
  invoice_id: {
    // Defining the `supplier_id` field to store a reference to the `Supplier` model.
    type: mongoose.Schema.Types.ObjectId,
    // The type is an ObjectId, which is a special data type in MongoDB for referencing documents.
    ref: "Invoice",
    // The `ref` option tells Mongoose to populate this field with data from the `Supplier` model.
  },

  
  current_paid_amount: {
    type: Number,
    required: false,  
  },

 
  date: {
    type: Date,
    required: false,  
  },

  updated_by: {
    type: Number,
    required: false,  
  }
  
}, { timestamps: true });  // This adds createdAt and updatedAt fields

export default mongoose.models.PaymentDetails || mongoose.model('PaymentDetails', PaymentDetailsSchema);
