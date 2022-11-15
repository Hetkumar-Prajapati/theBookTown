const express = require('express')
const router = express.Router()

// import customer model
const Customer = require('../models/customer')

// GET: /customers => show list of books
router.get('/', (req, res) => {
    // query the model to fetch & pass the customer data to the view
    Customer.find((err, customers) => {
        if (err) {
            console.log(err)
        }
        else {
            res.render('customers/index', { 
                title: 'Customers',
                customers: customers
            })
        }
    })  
})

// GET: /customers/create => show blank customer form
router.get('/create', (req, res) => {
    res.render('customers/create', { title: 'Add New Customer'})
})

// POST: /customers/create => process form submission
router.post('/create', (req, res) => {
    // create a new customer document from the fields in the form post
    Customer.create(req.body, (err, newCustomer) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/customers')
        }
    })
})



// make public
module.exports = router