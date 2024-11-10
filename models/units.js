import mongoose from "mongoose";
// Importing `mongoose`, which is a popular MongoDB object modeling tool.
// It allows for defining schemas and models to interact with MongoDB.
//import User from "./user"
const UnitsSchema = new mongoose.Schema({
    // Defining a new schema for the `Unit` model. This schema represents 
    // the structure of documents within the units collection in MongoDB.

    name: {
        // Defining the `name` field for the unit.
        type: String,
        // The data type for this field is a string.
        required: true,
        // This field is required, so a value must be provided when creating a new unit document.
        trim: true,
        // Trims any leading and trailing whitespace from the string.
    },

    status: {
        // Defining the `status` field for the unit.
        type: Boolean,
        // The data type for this field is a boolean, representing a true/false value.
        default: true,
        // The default value for the `status` field is set to `true`, indicating that 
        // the unit is active or available unless specified otherwise.
    },

    // Uncommented code for `created_by` and `updated_by` fields:
    // These fields are meant to store references to the `User` model, tracking who created or updated the unit.

    // created_by: {
    //     type: mongoose.Schema.Types.ObjectId,
         // This field stores the ObjectId of a `User` document, indicating who created the unit.
    //     ref: "User",
         // The `ref` option tells Mongoose which model to populate when referencing this ObjectId.
    // },

    // updated_by: {
    //     type: mongoose.Schema.Types.ObjectId,
         // This field stores the ObjectId of a `User` document, indicating who last updated the unit.
    //     ref: "User",
         // This creates a reference to the `User` model, allowing for population with user data.
    // },

}, { timestamps: true });
// Adding the `timestamps` option, which automatically adds `createdAt` and `updatedAt` fields 
// to the schema, tracking when each document is created and last modified.

export default mongoose.models.Unit || mongoose.model("Unit", UnitsSchema);
// Exporting the `Unit` model, which is created from the `UnitsSchema`.
// If the `Unit` model already exists (to prevent redefinition), it reuses the existing model.
