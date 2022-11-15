// import mongoose
const mongoose = require('mongoose')

// define schema for a customer
var customerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: 'firstname is required'
    },
    lastName: {
        type: String,
        required: 'lastname is required'
    },
    gender: {
        type: String,
        required: 'gender is required'
    }
})

// make public 
module.exports = mongoose.model('Customer', customerSchema)