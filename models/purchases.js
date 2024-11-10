import mongoose from "mongoose";
// Importing `mongoose`, a library that provides a schema-based solution to model application data.

import User from "./user";
// Importing the `User` model, which might be used later in the schema (currently commented out).

import Supplier from "./supplier";

const PurchasesSchema = new mongoose.Schema({
    // Defining a new schema for the `Purchases` model, representing the structure of purchase documents 
    // within the purchases collection in MongoDB.

    supplier_id: {
        // Defining the `supplier_id` field to store a reference to the `Supplier` model.
        type: mongoose.Schema.Types.ObjectId,
        // The type is an ObjectId, which is a special data type in MongoDB for referencing documents.
        ref: "Supplier",
        // The `ref` option tells Mongoose to populate this field with data from the `Supplier` model.
    },

    category_id: {
        // Defining the `category_id` field to store a reference to the `Category` model.
        type: mongoose.Schema.Types.ObjectId,
        // The type is an ObjectId, used for storing references to another document.
        ref: "Category",
        // The `ref` option is set to "Category", indicating the referenced model.
    },

    product_id: {
        // Defining the `product_id` field to store a reference to the `Product` model.
        type: mongoose.Schema.Types.ObjectId,
        // This is an ObjectId used for referencing another document.
        ref: "Product",
        // The `ref` option is set to "Product", indicating the referenced model.
    },

    date: {
        // Defining the `date` field to store the purchase date.
        type: Date,
        // The type is `Date`, which will store the date and time of the purchase.
    },

    purchase_no: {
        // Defining the `purchase_no` field to store the purchase number.
        type: String,
        // The type is `Number`, as purchase numbers are numeric.
        required: true,
        // This field is required, ensuring that a purchase number is always provided.
    },

    description: {
        // Defining the `description` field to store a description of the purchase.
        type: String,
        // The type is `String`, used for textual data.
        required: true,
        // This field is required, meaning a description must be provided.
    },

    buying_qty: {
        // Defining the `buying_qty` field to store the quantity of products purchased.
        type: Number,
        // The type is `Number`, used for storing numeric data.
        required: true,
        // This field is required, ensuring that the quantity is always provided.
    },

    unit_price: {
        // Defining the `unit_price` field to store the price per unit of the product.
        type: Number,
        // The type is `Number`, used for storing the price value.
        required: true,
        // This field is required, so a unit price must be provided.
    },

    buying_price: {
        // Defining the `buying_price` field to store the total price for the purchase.
        type: Number,
        // The type is `Number`, representing the total cost.
        required: true,
        // This field is required, ensuring that the total price is always provided.
    },

    status: {
        // Defining the `status` field to indicate whether the purchase is completed or not.
        type: Boolean,
        // The type is `Boolean`, used for true/false values.
        default: false,
        // The default value is `false`, indicating the purchase is not completed by default.
    },

    // Uncommented code for `created_by` and `updated_by` fields:
    // These fields are meant to store references to the `User` model, tracking who created or updated the purchase.

    // created_by: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     // This field stores the ObjectId of a `User` document, indicating who created the purchase.
    //     ref: "User",
    //     // The `ref` option tells Mongoose which model to populate when referencing this ObjectId.
    // },

    // updated_by: {
    //     type: mongoose.Schema.Types.ObjectId,
         // This field stores the ObjectId of a `User` document, indicating who last updated the purchase.
    //     ref: "User",
         // This creates a reference to the `User` model, allowing for population with user data.
    // },

}, { timestamps: true });
// Adding the `timestamps` option, which automatically adds `createdAt` and `updatedAt` fields 
// to the schema, tracking when each document is created and last modified.

export default mongoose.models.Purchases || mongoose.model("Purchases", PurchasesSchema);
// Exporting the `Purchases` model, which is created from the `PurchasesSchema`.
// If the `Purchases` model already exists (to prevent redefinition), it reuses the existing model.
