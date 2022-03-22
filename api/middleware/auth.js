const passport = require('passport')
const jwt = require('jsonwebtoken')
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/userModel');

// function auth(req, res, next) {
//     try {
//         const { token } = req.cookies

//         // empty token, signed out
//         if (!token) return res.status(401).json({ errorMessage: "Unauthorized" })

//         // checking token by using secret, will throw an error if not the same
//         const verified = jwt.verify(token, process.env.JWT_SECRET)

//         // update req object
//         //object with 'user' prop, which is the id from the db
//         req.user = verified.user

//         // exit out of middleware
//         next()
//     } catch (err) {
//         console.log(err)
//         res.status(401).json({ errorMessage: "Unauthorized" })
//     }
// }

// module.exports = auth

// passport.authenticate('local)
exports.local = passport.use(new LocalStrategy({
    usernameField: 'email',
}, User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// authenticate.getToken()
exports.getToken = function (user) {
    // user contains id for user doc
    //returns a token from sign method
    // sign in using the user, key string, expires in 1 hour
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: 3600 });

};

// configure jwt secret key and how to extract the token
const opts = {};
opts.secretOrKey = process.env.JWT_SECRET;
opts.jwtFromRequest = function(req) {
    let token = null;
    if (req && req.cookies)
    {
        token = req.cookies.jwt;
    }
    return token;
};

// set up jwtPassport strategy 
exports.jwtPassport = passport.use(
    new JwtStrategy(
        opts,
        (jwt_payload, done) => {
            User.findOne({ _id: jwt_payload._id }, (err, user) => {
                if (err) {
                    // handle error
                    return done(err, false);
                } else if (user) {
                    // check if a user was found, if so return the object inside a callback function
                    return done(null, user);
                } else {
                    // no user was found return false inside of callback
                    // could prompt user here to make account
                    return done(null, false);
                }
            });
        }
    )
);

// export as middleware function
exports.verifyUser = passport.authenticate('jwt', { session: false });