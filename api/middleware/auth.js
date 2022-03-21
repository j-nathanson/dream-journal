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


const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

// export jwt passport
exports.jwtPassport = passport.use(
    // use jwt way to authenticate. config params, callback with payload from checking the token and 'done' callback function provide by passport-jwt to access the 'user' document so it can load info from in onto the req object
    new JwtStrategy(
        opts,
        (jwt_payload, done) => {
            // jwt_payload object
            console.log('JWT payload:', jwt_payload);
            // search the data bases with the id from the token
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