const passport = require('passport')
const jwt = require('jsonwebtoken')
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/userModel');
const { deleteOne } = require('../models/userModel');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// passport.authenticate('local)
exports.local = passport.use(new LocalStrategy({
    usernameField: 'email',
}, User.authenticate()));

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

// Google strategy
exports.googlePassport = passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/google/callback"
},
    async function (accessToken, refreshToken, profile, done) {
        try {
            const userGmail = profile.emails[0].value;
            const googleId = profile.id
            const user = await User.findOne({ email: userGmail })

            if (user) {
                // found the user
                return done(null, user);

            } else {
                // create a user
                const { givenName } = profile.name;

                const newUser = await new User({ email: userGmail, name: givenName, googleId: googleId }).save();

                return done(null, newUser);

            }
        } catch (err) {
            return cb(err, false);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user)
})
passport.deserializeUser((user, done) => {
    done(null, user)
})