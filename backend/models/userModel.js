const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add username value"],
    },
    email: {
        type: String,
        required: [true, "Please add email"],
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: [true, "Please add password"],
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)
