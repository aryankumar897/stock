import mongoose from "mongoose";
// Importing `mongoose` to define the schema and create a model for MongoDB.

//import User from "./user";
// Importing the `User` model, which could be used for tracking who created or updated the customer (currently commented out).

const CustomerSchema = new mongoose.Schema({
    name: {
        // Defining the `name` field to store the customer's name.
        type: String,
        // The type is `String`, appropriate for storing names.
        required: true,
        // This field is required, ensuring that a customer name must be provided.
        trim: true,
        // The `trim` option removes any leading or trailing whitespace from the customer's name.
    },
    email: {
        // Defining the `email` field to store the customer's email address.
        type: String,
        // The type is `String`, appropriate for storing email addresses.
        required: true,
        // This field is required, ensuring that an email address must be provided.
        trim: true,
        // The `trim` option removes any leading or trailing whitespace from the email.
        unique: true,
        // The `unique` option ensures that each email is unique, preventing duplicate email addresses in the database.
        index: true,
        // The `index` option improves query performance when searching by email.
        lowercase: true,
        // The `lowercase` option converts the email to lowercase before storing it in the database, ensuring consistency.
    },
    mobileNumber: {
        // Defining the `mobileNumber` field to store the customer's phone number.
        type: Number,
        // The type is `Number`, appropriate for storing numerical data like phone numbers.
        required: true,
        // This field is required, ensuring that a mobile number must be provided.
    },
    image: {
        // Defining the `image` field to store the customer's profile image.
        type: String,
        // The type is `String`, appropriate for storing image URLs or paths.
      
        // This field is required, ensuring that an image must be provided.
    },
    address: {
        // Defining the `address` field to store the customer's address.
        type: String,
        // The type is `String`, appropriate for storing addresses.
      
        // This field is required, ensuring that an address must be provided.
    },
    status: {
        // Defining the `status` field to indicate whether the customer is active or inactive.
        type: Boolean,
        // The type is `Boolean`, representing a true/false value.
        default: true,
        // The default value is `true`, meaning the customer is active by default.
    },

    // Uncommented code for `created_by` and `updated_by` fields:
    // These fields would store references to the `User` model, tracking who created or last updated the customer.

    // created_by: {
    //     type: mongoose.Schema.Types.ObjectId,
         // This field would store the ObjectId of a `User` document, indicating who created the customer.
    //     ref: "User",
         // The `ref` option indicates that this ObjectId references a document in the `User` collection.
    // },

    // updated_by: {
    //     type: mongoose.Schema.Types.ObjectId,
         // This field would store the ObjectId of a `User` document, indicating who last updated the customer.
    //     ref: "User",
         // The `ref` option indicates that this ObjectId references a document in the `User` collection.
    // },

}, { timestamps: true });
// Adding the `timestamps` option automatically creates `createdAt` and `updatedAt` fields,
// which track when each customer document is created and last modified.

export default mongoose.models.Customer || mongoose.model("Customer", CustomerSchema);
// Exporting the `Customer` model, which is created from the `CustomerSchema`.
// If the `Customer` model already exists (to prevent redefinition), it reuses the existing model.
