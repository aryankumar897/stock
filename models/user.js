import mongoose from "mongoose";
// Importing `mongoose`, which is a popular library for MongoDB object modeling.
// It allows for the creation of schemas and models to interact with MongoDB.
//www.downloadly.ir
const UserSchema = new mongoose.Schema({
    // Defining a new schema for the `User` model. A schema represents the structure of documents 
    // within a collection in MongoDB, enforcing rules and validation.

    name: {
        // Defining the `name` field for the user.
        type: String,
        // The data type for this field is a string.
        required: true,
        // This field is required, so a value must be provided when creating a new user document.
        trim: true,
        // Any leading and trailing whitespace will be removed from the string.
        minLength: 3,
        // The minimum length for the string is 3 characters.
        maxLength: 20
        // The maximum length for the string is 20 characters.
    },

    username: {
        // Defining the `username` field for the user.
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 20
        // Same validation rules as the `name` field to ensure consistency.
    },

    email: {
        // Defining the `email` field for the user.
        type: String,
        required: true,
        trim: true,
        unique: true,
        // Ensures that each email address in the collection is unique.
        index: true,
        // Creates an index on this field, improving the efficiency of queries based on email.
        lowercase: true,
        // Converts the email to lowercase before storing it in the database to ensure consistency.
    },

    image: {
        // Defining the `image` field for the user.
        type: String,
   
        // This field is required, so a value (likely a URL or file path) must be provided for the user's image.
    },
    phone:{ 

        type: String,
   

    },

    password: {
        // Defining the `password` field for the user.
        type: String,
        required: true,
        // The password field is required, and it will typically be a hashed string.
    },

    role: {
        // Defining the `role` field for the user.
        type: String,
        enum: ['user', 'admin'],
        // Restricts the value of this field to either 'user' or 'admin'.
        default: "user",
        // Sets the default value for this field to 'user' if no value is provided.
        required: true
        // This field is required, ensuring that every user has a role.
    },
    subscription: {
        type: String,

    },


}, { timestamps: true });
// Adding the `timestamps` option, which automatically adds `createdAt` and `updatedAt` fields 
// to the schema, tracking when each document is created and last modified.

export default mongoose.models.User || mongoose.model("User", UserSchema);
// Exporting the `User` model, which is created from the `UserSchema`.
// If the `User` model already exists (to prevent redefinition), it reuses the existing model.
