const jwt = require('jsonwebtoken')

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