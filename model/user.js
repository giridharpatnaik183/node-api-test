const mongoose = require("mongoose");

//create schema for collection
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique:true
    },
    email: {
        type: String,
        unique: true,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    confirmPassword: {
        type: String,
        required:true
    }
})

//create Model
const User = new mongoose.model("User", userSchema);

module.exports = User;