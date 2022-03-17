const mongoose = require('mongoose')

const dreamSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

const Dream = mongoose.model('dream', dreamSchema)

module.exports = Dream