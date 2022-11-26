const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/user')

// GET: /auth/register => show register form
router.get('/register', (req, res) => {
    res.render('auth/register', { 
        title: 'User Registration'
    })
})

// POST: /auth/register => create new user and redirect to /employers
router.post('/register', (req, res) => {
    User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
        if (err) {
            console.log(err)
        }
        else {
            req.login(user, (err) => {
                res.redirect('/')
            })
        }
    })})

// GET: /auth/login => show register form
router.get('/login', (req, res) => {
    // if there are any session messages, store them in a local var
    let messages = req.session.messages || []

    // clear the session error messages
    req.session.messages = []

    res.render('auth/login', { 
        title: 'Login',
        messages: messages
    })
})

// POST: /auth/login => use passport to do auth check
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureMessage: 'Invalid Login'
}))

// GET: /auth/logout => well this is obvious isn't it?
router.get('/logout', (req, res, next) => {
    req.session.messages = []
    req.logout((err) => {
        if (err) {
            return next(err)
        }
        res.redirect('/auth/login')
    })
})

// GET: /auth/google => invoke Google sign in attempt
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}), (req, res) => {}
)

// GET: /auth/google/callback => handle return of user from google
router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/auth/login'
}), (req, res) => {
    res.redirect('/')
})

// GET: /auth/facebook => invoke facebook sign in attempt
router.get('/facebook', passport.authenticate('facebook', {
    scope: ['profile']
}), (req, res) => {}
)
// GET: /auth/facebook/callback => handle return of user from facebook
router.get('/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/auth/login'
}), (req, res) => {
    res.redirect('/')
})
// GET: /auth/github => invoke github sign in attempt
router.get('/github', passport.authenticate('github', {
    scope: ['profile']
}), (req, res) => {}
)
// GET: /auth/github/callback => handle return of user from github
router.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/auth/login'
}), (req, res) => {
    res.redirect('/')
})

module.exports = router
