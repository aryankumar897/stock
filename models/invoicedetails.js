import mongoose from "mongoose";
// Importing `mongoose`, which is a popular library for MongoDB object modeling.
// It allows for the creation of schemas and models to interact with MongoDB.
//www.downloadly.ir

import Category from "./category";
import Product from "./product";
const InvoicedetailsSchema = new mongoose.Schema({
  // Defining a new schema for the `User` model. A schema represents the structure of documents 
  // within a collection in MongoDB, enforcing rules and validation.



  date: {
    // Defining the `username` field for the user.
    type: Date,
    required: true,

  },

  invoice_id: {
    // Defining the `supplier_id` field to store a reference to the `Supplier` model.
    type: mongoose.Schema.Types.ObjectId,
    // The type is an ObjectId, which is a special data type in MongoDB for referencing documents.
    ref: "Invoice",
    // The `ref` option tells Mongoose to populate this field with data from the `Supplier` model.

  },



  category_id: {
    // Defining the `supplier_id` field to store a reference to the `Supplier` model.
    type: mongoose.Schema.Types.ObjectId,
    // The type is an ObjectId, which is a special data type in MongoDB for referencing documents.
    ref: "Category",
    // The `ref` option tells Mongoose to populate this field with data from the `Supplier` model.

  },


  product_id: {
    // Defining the `supplier_id` field to store a reference to the `Supplier` model.
    type: mongoose.Schema.Types.ObjectId,
    // The type is an ObjectId, which is a special data type in MongoDB for referencing documents.
    ref: "Product",
    // The `ref` option tells Mongoose to populate this field with data from the `Supplier` model.

  },


  selling_qty: {
    // Defining the `buying_qty` field to store the quantity of products purchased.
    type: Number,
    // The type is `Number`, used for storing numeric data.
    required: true,
    // This field is required, ensuring that the quantity is always provided.
  },

  unit_price: {
    // Defining the `buying_qty` field to store the quantity of products purchased.
    type: Number,
    // The type is `Number`, used for storing numeric data.
    required: true,
    // This field is required, ensuring that the quantity is always provided.
  },

  selling_price: {
    // Defining the `buying_qty` field to store the quantity of products purchased.
    type: Number,
    // The type is `Number`, used for storing numeric data.
    required: true,
    // This field is required, ensuring that the quantity is always provided.
  },



  status: {
    // Defining the `status` field to indicate whether the purchase is completed or not.
    type: Boolean,
    // The type is `Boolean`, used for true/false values.
    default: true,
    // The default value is `false`, indicating the purchase is not completed by default.
  },


}, { timestamps: true });
// Adding the `timestamps` option, which automatically adds `createdAt` and `updatedAt` fields 
// to the schema, tracking when each document is created and last modified.

export default mongoose.models.Invoicedetails || mongoose.model("Invoicedetails", InvoicedetailsSchema);
// Exporting the `User` model, which is created from the `UserSchema`.
// If the `User` model already exists (to prevent redefinition), it reuses the existing model.
