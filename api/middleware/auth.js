const passport = require('passport')
const jwt = require('jsonwebtoken')
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/userModel');
// const FacebookStrategy = require('passport-facebook-token')
const FacebookStrategy = require("passport-facebook").Strategy

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
opts.jwtFromRequest = function (req) {
    let token = null;
    if (req && req.cookies) {
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


//! Facebook Strategy
exports.facebookPassport = passport.use(new FacebookStrategy({
    clientID: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_SECRET,
    callbackUrl: "/auth/facebook/callback" // route to send back after it verifies the user
},
    // callback used after verififying
    (accessToken, refreshToken, profile, done) => {
        User.findOne({ facebookId: profile.id }, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (!err && user) {
                return done(null, user);
            } else {
                console.log(user)
                // user = new User({ username: profile.displayName });
                // user.facebookId = profile.id;
                // user.firstname = profile.name.givenName;
                // user.lastname = profile.name.familyName;

                // user.save((err, user) => {
                //     if (err) {
                //         return done(err, false);
                //     } else {
                //         return done(null, user);
                //     }
                // });
            }
        });
    }
))
