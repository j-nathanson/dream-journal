const router = require('express').Router()
const Dream = require('../models/dreamModel')
const auth = require('../middleware/auth')

//* /journal

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

// ** UPDATE AN ENTRY'S TITLE AND DESCRIPTION
router.put('/', auth, async (req, res) => {
    try {
        const { entryId, newTitle, newDescription } = req.body

        const entry = await Dream.findByIdAndUpdate(entryId, { title: newTitle, description: newDescription }).exec()

        res.json(entry)
    } catch (err) {
        console.log(err)
        res.status(500).send();
    }
})

// ** DELETE AN ENTRY
router.delete('/', auth, async (req, res) => {
    try {
        const { entryId } = req.body
        const deleted = await Dream.findByIdAndDelete(entryId)

        res.json(deleted)
    } catch (err) {
        console.log(err)
        res.status(500).send();
    }
})

module.exports = router