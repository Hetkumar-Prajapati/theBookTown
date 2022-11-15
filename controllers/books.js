const express = require('express')
const router = express.Router()

// import Book model
const Book = require('../models/book')
const Customer = require('../models/customer')

// GET: /books => show list of books
router.get('/', (req, res) => {
    // query the model to fetch & pass the book data to the view
    Book.find((err, books) => {
        if (err) {
            console.log(err)
        }
        else {
            res.render('books/index', { 
                title: 'Books',
                books: books
            })
        }
    })  
})

// GET: /books/create => show blank book form
router.get('/create', (req, res) => {
    Customer.find((err,customers)=>{
        if(err){
            console.log(err)
        }
        else{
            res.render('books/create', {
            title: 'Add New Book',
            customers: customers
        })            
        }
    }).sort('firstName')
})

// POST: /books/create => process form submission
router.post('/create', (req, res) => {
    // create a new Book document from the fields in the form post
    Book.create(req.body, (err, newBook) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/books')
        }
    })
})

// GET: /books/delete/abc123 => remove selected Book document
router.get('/delete/:_id', (req, res) => {
    Book.remove({ _id: req.params._id }, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/books')
        }
    })
})

// GET: /books/edit/abc123 => display populated form for editing
router.get('/edit/:_id', (req, res) => {
    // get customers for Form dropdown
    Customer.find((err, customers) => {
        if (err) {
            console.log(err)
        }
        else {
            // fetch selected Book for display
            Book.findById(req.params._id, (err, book) => {
                if (err) {
                    console.log(err)
                }
                else {
                    res.render('books/edit', { 
                        title: 'Book Details',
                        Customer: customers,
                        Book: book
                    })
                }
            })           
        }
    }).sort('firstName')   
})

// POST: /books/edit/abc123 => update the db for the selected doc
router.post('/edit/:_id',(req, res) => {
    Book.findByIdAndUpdate({ _id: req.params._id }, req.body, null, (err, employer) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/books')
        }
    })
})


// make public
module.exports = router