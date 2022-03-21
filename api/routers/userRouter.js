const router = require('express').Router()
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const auth = require('../middleware/auth')
//* auth/

//** REGISTER
// POST allows new user to register on website
router.post('/', async (req, res) => {
    try {
        if (!req.body.name) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all fields." })
        }
        await User.register(
            new User({ email: req.body.email, name: req.body.name })
            , req.body.password,
            async (err, user) => {
                if (err) {
                    return res
                        .status(500)
                        .setHeader('Content-Type', 'application/json')
                        .json({ err: err });
                }
                // save in db
                await user.save()
                // no error, tell passport to use the local strategy and after send back successful message
                passport.authenticate('local')(req, res, () => {
                    const token = auth.getToken({ _id: req.user._id });

                    return res
                        .status(200)
                        .setHeader('Content-Type', 'application/json')
                        .cookie("token", token, { httpOnly: true })
                        .json({ success: true, status: 'Registration Successful!' });
                });
            })
    } catch (err) {
        return res
            .status(500)
            .setHeader('Content-Type', 'application/json')
            .json({ err: err })
    }
})

// *LOGIN 
router.post('/login', passport.authenticate('local'), (req, res) => {
    // issue token to user, payload is the user id
    const token = auth.getToken({ _id: req.user._id });

    return res
        .status(200)
        .cookie("token", token, { httpOnly: true })
        .setHeader('Content-Type', 'application/json')
        .json({ success: true, status: 'You are successfully logged in!' })
});

//** LOGOUT
router.get('/logout', (req, res) => {
    // attempt to delete, if you can't at least make it empty and expired so the browser can automatically clear it.
    res
        .cookie('token', '', {
            httpOnly: true,
            expires: new Date(0)
        })
        .send()
})

//** IS USER LOGGED IN?
router.get('/loggedIn', (req, res) => {
    // will return true or false based if a cookies is present and verified
    //  will send 200 status code regardless
    try {
        const { token } = req.cookies

        // no token
        if (!token) return res.json(false)

        // checking token by using secret, will throw an error if not the same
        jwt.verify(token, process.env.JWT_SECRET)

        // token verified
        res.send(true)
    } catch (err) {
        // token not verified
        res.json(false)
    }
})

module.exports = router