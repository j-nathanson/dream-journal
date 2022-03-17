const mongoose = require('mongoose')

const dreamSchema = new mongoose.Schema({
    name: { type: String, required: true }
})

const Dream = mongoose.model('dream', dreamSchema)

module.exports = Dream