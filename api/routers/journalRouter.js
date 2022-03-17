const router = require('express').Router()
const Dream = require('../models/dreamModel')
const auth = require('../middleware/auth')

//* /journal

// **ADD AN ENTRY TO THE JOURNAL
router.post('/', auth, async (req, res) => {
    try {
        const { title, date, description } = req.body;
        const userId = req.user

        const newDream = new Dream({
            userId, title, date, description
        })

        // save new Entry in db
        savedDream = await newDream.save()

        // send back new saved dream-entry obj
        res.json(savedDream)
    } catch (err) {
        console.log(err)
        // 500 server error
        res.status(500).send();
    }
})

// *GET ALL JOURNAL ENTRIES
router.get('/', auth, async (req, res) => {
    try {
        // get entries only if they have the same userId
        const userId = req.user
        const journal = await Dream.find({ userId: userId })

        res.json(journal)
    } catch (err) {
        console.log(err)
        // 500 server error
        res.status(500).send();
    }
})
module.exports = router