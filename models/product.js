import mongoose from "mongoose";
// Importing `mongoose` to create a schema and model for MongoDB.

import User from "./user";
// Importing the `User` model, which could be used for tracking who created or updated the product (currently commented out).

import Unit  from "./units"
import supplier from "./supplier";
const ProductSchema = new mongoose.Schema({
    productName: {
        // Defining the `productName` field to store the name of the product.
        type: String,
        // The type is `String`, which is suitable for textual data like names.
        required: true,
        // This field is required, so a product name must always be provided.
        trim: true,
        // `trim` option removes any leading or trailing whitespace from the product name.
    },

    quantity: {
        // Defining the `quantity` field to store the available quantity of the product.
        type: Number,
        // The type is `Number`, which is appropriate for numeric data like quantities.
        required: true,
        // This field is required, ensuring that the quantity is always provided.
        default: 0,
        // Setting a default value of `0` for the quantity, in case it's not specified.
    },

    status: {
        // Defining the `status` field to indicate whether the product is active or inactive.
        type: Boolean,
        // The type is `Boolean`, representing a true/false value.
        default: true,
        // The default value is `true`, meaning the product is active by default.
    },

    supplierNameId: {
        // Defining the `supplierNameId` field to store a reference to the `Supplier` model.
        type: mongoose.Schema.Types.ObjectId,
        // The type is `ObjectId`, which references another document in MongoDB.
        ref: "Supplier",
        // The `ref` option specifies that this ObjectId references a document in the `Supplier` collection.
    },

    unitNameId: {
        // Defining the `unitNameId` field to store a reference to the `Unit` model.
        type: mongoose.Schema.Types.ObjectId,
        // The type is `ObjectId`, used for storing references to another document.
        ref: "Unit",
        // The `ref` option indicates that this ObjectId references a document in the `Unit` collection.
    },

    categoryNameId: {
        // Defining the `categoryNameId` field to store a reference to the `Category` model.
        type: mongoose.Schema.Types.ObjectId,
        // The type is `ObjectId`, used for referencing another document.
        ref: "Category",
        // The `ref` option specifies that this ObjectId references a document in the `Category` collection.
    },

    // Uncommented code for `created_by` and `updated_by` fields:
    // These fields would store references to the `User` model, tracking who created or last updated the product.

    // created_by: {
    //     type: mongoose.Schema.Types.ObjectId,
         // This field would store the ObjectId of a `User` document, indicating who created the product.
    //     ref: "User",
         // The `ref` option indicates that this ObjectId references a document in the `User` collection.
    // },

    // updated_by: {
    //     type: mongoose.Schema.Types.ObjectId,
         // This field would store the ObjectId of a `User` document, indicating who last updated the product.
    //     ref: "User",
         // The `ref` option indicates that this ObjectId references a document in the `User` collection.
    // },

}, { timestamps: true });
// Adding the `timestamps` option automatically creates `createdAt` and `updatedAt` fields,
// which track when each product document is created and last modified.

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
// Exporting the `Product` model, which is created from the `ProductSchema`.
// If the `Product` model already exists (to prevent redefinition), it reuses the existing model.
