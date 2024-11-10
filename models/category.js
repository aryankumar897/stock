import mongoose from "mongoose";
// Importing `mongoose` to define a schema and create a model for MongoDB.

//import User from "./user";
// Importing the `User` model, which could be used for tracking who created or updated the category (currently commented out).

const CategorySchema = new mongoose.Schema({
    name: {
        // Defining the `name` field to store the name of the category.
        type: String,
        // The type is `String`, appropriate for storing textual data like names.
        required: true,
        // This field is required, ensuring that a category name must be provided.
        trim: true,
        // The `trim` option removes any leading or trailing whitespace from the category name.
    },

    status: {
        // Defining the `status` field to indicate whether the category is active or inactive.
        type: Boolean,
        // The type is `Boolean`, representing a true/false value.
        default: true,
        // The default value is `true`, meaning the category is active by default.
    },

    // Uncommented code for `created_by` and `updated_by` fields:
    // These fields would store references to the `User` model, tracking who created or last updated the category.

    // created_by: {
    //     type: mongoose.Schema.Types.ObjectId,
         // This field would store the ObjectId of a `User` document, indicating who created the category.
    //     ref: "User",
         // The `ref` option indicates that this ObjectId references a document in the `User` collection.
    // },

    // updated_by: {
    //     type: mongoose.Schema.Types.ObjectId,
         // This field would store the ObjectId of a `User` document, indicating who last updated the category.
    //     ref: "User",
        // The `ref` option indicates that this ObjectId references a document in the `User` collection.
    // },

}, { timestamps: true });
// Adding the `timestamps` option automatically creates `createdAt` and `updatedAt` fields,
// which track when each category document is created and last modified.

export default mongoose.models.Category || mongoose.model("Category", CategorySchema);
// Exporting the `Category` model, which is created from the `CategorySchema`.
// If the `Category` model already exists (to prevent redefinition), it reuses the existing model.
