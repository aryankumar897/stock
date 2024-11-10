import mongoose from "mongoose";
// Importing `mongoose`, a library that provides a straightforward, schema-based solution to model your application data.

import User from "./user";
// Importing the `User` model, which might be used later in the schema (although currently commented out).

const SupplierSchema = new mongoose.Schema({
    // Defining a new schema for the `Supplier` model. This schema represents the structure of documents 
    // within the suppliers collection in MongoDB.

    name: {
        // Defining the `name` field for the supplier.
        type: String,
        // The data type for this field is a string.
        required: true,
        // This field is required, so a value must be provided when creating a new supplier document.
        trim: true,
        // Trims any leading and trailing whitespace from the string.
    },

    email: {
        // Defining the `email` field for the supplier.
        type: String,
        // The data type for this field is a string.
        required: true,
        // This field is required, so a value must be provided.
        trim: true,
        // Trims any leading and trailing whitespace from the string.
        unique: true,
        // Ensures that each email value must be unique in the collection.
        index: true,
        // Creates an index for the `email` field, improving query performance.
        lowercase: true,
        // Converts the email to lowercase before storing it in the database.
    },

    phone: {
        // Defining the `phone` field for the supplier.
        type: Number,
        // The data type for this field is a number.
        required: true,
        // This field is required, ensuring that a phone number is provided.
    },

    address: {
        // Defining the `address` field for the supplier.
        type: String,
        // The data type for this field is a string.
        required: true,
        // This field is required, so an address must be provided.
    },

    status: {
        // Defining the `status` field for the supplier.
        type: Boolean,
        // The data type for this field is a boolean, representing a true/false value.
        default: true,
        // The default value for the `status` field is set to `true`, indicating that the supplier is active.
    },

    // Uncommented code for `created_by` and `updated_by` fields:
    // These fields are meant to store references to the `User` model, tracking who created or updated the supplier.

    // created_by: {
    //     type: mongoose.Schema.Types.ObjectId,
         // This field stores the ObjectId of a `User` document, indicating who created the supplier.
    //     ref: "User",
         // The `ref` option tells Mongoose which model to populate when referencing this ObjectId.
    // },

    // updated_by: {
    //     type: mongoose.Schema.Types.ObjectId,
        // This field stores the ObjectId of a `User` document, indicating who last updated the supplier.
    //     ref: "User",
         // This creates a reference to the `User` model, allowing for population with user data.
    // },

}, { timestamps: true });
// Adding the `timestamps` option, which automatically adds `createdAt` and `updatedAt` fields 
// to the schema, tracking when each document is created and last modified.

export default mongoose.models.Supplier || mongoose.model("Supplier", SupplierSchema);
// Exporting the `Supplier` model, which is created from the `SupplierSchema`.
// If the `Supplier` model already exists (to prevent redefinition), it reuses the existing model.
