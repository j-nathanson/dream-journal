const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    googleId: { type: String }
})

// will automatically add username and password/ will salt and hash password
// will also add authentication methods on the model
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

const User = mongoose.model('user', userSchema)

module.exports = User