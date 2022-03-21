const passport = require('passport')
const jwt = require('jsonwebtoken')
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/userModel');

function auth(req, res, next) {
    try {
        const { token } = req.cookies

        // empty token, signed out
        if (!token) return res.status(401).json({ errorMessage: "Unauthorized" })

        // checking token by using secret, will throw an error if not the same
        const verified = jwt.verify(token, process.env.JWT_SECRET)

        // update req object
        //object with 'user' prop, which is the id from the db
        req.user = verified.user

        // exit out of middleware
        next()
    } catch (err) {
        console.log(err)
        res.status(401).json({ errorMessage: "Unauthorized" })
    }
}

module.exports = auth


exports.local = passport.use(new LocalStrategy({
    usernameField: 'email',
}, User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());