// import mongoose
const mongoose = require('mongoose')

// define schema for a Book
var bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Book title is required'
    },
    author: {
        type: String,
        required: 'Book author is required'
    },
    status: {
        type: String,
        required: 'Book status is required'
    },
    checkedOutBy: {
        type: String,
        required: 'Book checkedOutBy person is required'
    }
})

// make public 
module.exports = mongoose.model('Book', bookSchema)