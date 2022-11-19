const express = require('express')
const router = express.Router()

// import Book model
const Book = require('../models/book')
const Customer = require('../models/customer')

// auth check to be called before any CUD method
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/auth/login')
}

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
                books: books,
                user: req.user
            })
        }
    })  
})

// GET: /books/create => show blank book form
router.get('/create', isAuthenticated ,(req, res) => {
    Customer.find((err,customers)=>{
        if(err){
            console.log(err)
        }
        else{
            res.render('books/create', {
            title: 'Add New Book',
            customers: customers,
            user: req.user
        })            
        }
    }).sort('firstName')
})

// POST: /books/create => process form submission
router.post('/create', isAuthenticated, (req, res) => {
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
router.get('/delete/:_id',isAuthenticated, (req, res) => {
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
router.get('/edit/:_id',isAuthenticated , (req, res) => {
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
                        Book: book,
                        user: req.user
                    })
                }
            })           
        }
    }).sort('firstName')   
})

// POST: /books/edit/abc123 => update the db for the selected doc
router.post('/edit/:_id',isAuthenticated, (req, res) => {
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