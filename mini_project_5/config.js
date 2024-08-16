const mongoose = require('mongoose');

// Connect to the "blogDB" database for forms
const formsConnection = mongoose.createConnection("mongodb://127.0.0.1:27017/blogDB", { useNewUrlParser: true, useUnifiedTopology: true });
formsConnection.once('connected', () => {
    console.log("Forms Database connection established");
});
formsConnection.on('error', (err) => {
    console.error("Forms Database connection not established:", err);
});

// Define the Form schema
const FormSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    property: { 
      type: String,
      required:true
    },image: {
      type: Buffer, 
      required: true,
    },
});

// Create the Form model for forms
const Form = formsConnection.model("forms", FormSchema);

// Export the Form model for use in other parts of your application
module.exports.Form = Form;

// Connect to the "Login" database for users
const loginConnection = mongoose.createConnection("mongodb://127.0.0.1:27017/Login", { useNewUrlParser: true, useUnifiedTopology: true });
loginConnection.once('connected', () => {
    console.log("Login Database connection established");
});
loginConnection.on('error', (err) => {
    console.error("Login Database connection not established:", err);
});

// Define the Login schema
const LoginSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Create the Login model for users
const User = loginConnection.model("users", LoginSchema);

// Export the User model for use in other parts of your application
module.exports.User = User;
