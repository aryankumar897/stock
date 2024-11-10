import mongoose from "mongoose";
// Importing `mongoose`, which is a popular library for MongoDB object modeling.
// It allows for the creation of schemas and models to interact with MongoDB.
//www.downloadly.ir
const InvoiceSchema = new mongoose.Schema({
  // Defining a new schema for the `User` model. A schema represents the structure of documents 
  // within a collection in MongoDB, enforcing rules and validation.

  invoice_no: {
    // Defining the `name` field for the user.
    type: String,
    // The data type for this field is a string.
    required: true,
 
  },

  date: {
    // Defining the `username` field for the user.
    type: Date,
    required: true,
  
  },

  description: {
    // Defining the `email` field for the user.
    type: String,
    required: true,
   
   
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

export default mongoose.models.Invoice || mongoose.model("Invoice", InvoiceSchema);
// Exporting the `User` model, which is created from the `UserSchema`.
// If the `User` model already exists (to prevent redefinition), it reuses the existing model.
