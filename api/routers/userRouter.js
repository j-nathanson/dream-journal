const router = require('express').Router()
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const auth = require('../middleware/auth')
const CLIENT_URL = "http://localhost:3000/";

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
                        .cookie("jwt", token, { httpOnly: true })
                        .json({ success: true, status: 'Registration Successful!' });
                });
            })
    } catch (err) {
        return res
            .status(500)
            .setHeader('Content-Type', 'application/json')
            .json({ message: err.message })
    }
})

// *LOGIN 
router.post('/login', passport.authenticate('local'), (req, res) => {
    // issue token to user, payload is the user id
    const token = auth.getToken({ _id: req.user._id });

    return res
        .status(200)
        .cookie("jwt", token, { httpOnly: true })
        .setHeader('Content-Type', 'application/json')
        .json({ success: true, status: 'You are successfully logged in!' })
});

//** LOGOUT
router.get('/logout', auth.verifyUser, (req, res) => {

    return res
        .clearCookie('jwt')
        .clearCookie('session')
        .clearCookie('session.sig')
        .send()

})

//** IS USER LOGGED IN?
router.get('/loggedIn', (req, res) => {
    // will return true or false based if a cookies is present and verified
    //  will send 200 status code regardless
    try {
        const token = req.cookies.jwt

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

// GET failed login attempt
router.get('/login/failed', (req, res) => {
    return res
        .status(401)
        .json({
            success: false,
            message: 'failure'
        })
})

//* GET Give google login/register users a jwt token
router.get('/login/success', (req, res) => {
    if (req.user) {
        const token = auth.getToken({ _id: req.user._id });
        return res
            .status(200)
            .cookie("jwt", token, { httpOnly: true })
            .json({
                success: true,
                status: 'you are logged in!',
            })
    }
    return res
        .status(202)
        .json({ message: 'Please login with the correct credentials.' })
})

//* GOOGLE LOGIN
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: CLIENT_URL,
    failureRedirect: '/login/failed'
}))
module.exports = router