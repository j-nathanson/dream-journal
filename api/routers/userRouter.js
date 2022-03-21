const router = require('express').Router()
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const authenticate = require('../middleware/auth')
//* auth/

//** REGISTER
router.post('/', async (req, res) => {
    try {
        const { email, password, passwordVerify } = req.body

        // validate

        // empty fields 400 bad req
        if (!email || !password || !passwordVerify) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." })
        }

        // short password 400 bad req
        if (password.length < 6) {
            return res
                .status(400)
                .json({ errorMessage: "Please add a password of at least 6 characters." })
        }

        // different passwords 400 bad req
        if (password !== passwordVerify) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter the same password twice." })
        }


        // find user
        const existingUser = await User.findOne({ email: email })

        //  user already exists 400 bad req
        if (existingUser) {
            return res
                .status(400)
                .json({ errorMessage: "An account with this email already exists." })
        }

        // hash the password

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt)

        //    save a new user to db
        const newUser = new User({
            email,
            passwordHash
        })

        // returns doc that was saved, new user
        const savedUser = await newUser.save()


        // create and sign token with users mongo id and our secret info
        const token = jwt.sign({ user: savedUser._id }, process.env.JWT_SECRET)

        // send token in HTTP-only cookie
        res
            .cookie("token", token, { httpOnly: true })
            .send()

    } catch (err) {
        console.log(err)
        // 500 server error
        res.status(500).send();
    }
})

//** REGISTER2
// POST allows new user to register on website
router.post('/signup', async (req, res) => {
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
                    return res
                        .status(200)
                        .setHeader('Content-Type', 'application/json')
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

//**LOGIN
router.post("/login", async (req, res) => {
    try {
        // user enters an email and pass
        const { email, password } = req.body

        // validate
        // empty fields 400 bad req
        if (!email || !password) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." })
        }

        //*for validating usernames and passwords it's safer to have the same error message

        // find user by the email given, returns the user
        const existingUser = await User.findOne({ email })

        // dont exist 401 unauthorized
        if (!existingUser)
            res
                .status(401)
                .json({ errorMessage: "Wrong email or password" })

        // checks if the hash came from the password
        const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash)

        if (!passwordCorrect)
            res
                .status(401)
                .json({ errorMessage: "Wrong email or password" })

        // create and sign token with users mongo id and our secret info
        const token = jwt.sign({ user: existingUser._id }, process.env.JWT_SECRET)

        // send token in HTTP-only cookie
        res
            .cookie("token", token, { httpOnly: true })
            .send()

    } catch (err) {
        console.log(err)
        // 500 server error
        res.status(500).send();
    }
})

// *LOGIN 2
router.post('/login2', passport.authenticate('local'), (req, res) => {
    // issue token to user, payload is the user id
    // const token = authenticate.getToken({ _id: req.user._id });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ success: true, status: 'You are successfully logged in!' });
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