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
    rating: {
        type: Number,

    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String
    }
})

const Dream = mongoose.model('dream', dreamSchema)

module.exports = Dream