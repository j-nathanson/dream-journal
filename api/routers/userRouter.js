const router = require('express').Router()
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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

module.exports = router