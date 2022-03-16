const express = require("express")
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cookieParser = require("cookie-parser")
const cors = require('cors')


// read .env at root, set up process.env
dotenv.config();

// server set up
const app = express()
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})

// middleware
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
// });
app.use(express.json())
app.use(cookieParser())

const options = {
    origin: "http://localhost:3000"
}
app.use(cors(options))

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
app.use('/customer', require('./routers/customerRouter'))