const express = require("express")
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cookieParser = require("cookie-parser")
const cookieSession = require('cookie-session')
const cors = require('cors')
const logger = require('morgan')
const passport = require('passport')


// read .env at root, set up process.env
dotenv.config();

// server set up
const app = express();

// set up cookie to use for google login, 1 day expiration,
// httpOnly prevents client-side scripts from accessing data
app.use(cookieSession(
    {
        name: "session",
        keys: [process.env.COOKIE_SECRET],
        maxAge: 24 * 60 * 1000,
        httpOnly: true
    }
))

// * middleware
app.use(logger('dev'));
app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize());
app.use(passport.session())

// have browser set cookies from the origin
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}))

// connect to mongoDB
mongoose.connect(process.env.MDB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) return console.error(err);
    console.log("Connected to MonogoDB")
})

// routers
app.use('/auth', require('./routers/userRouter'))
app.use('/journal', require('./routers/journalRouter'))

// port
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})