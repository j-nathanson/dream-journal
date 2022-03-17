const mongoose = require('mongoose')

const dreamSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

const Dream = mongoose.model('dream', dreamSchema)

module.exports = Dream