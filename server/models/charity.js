const mongoose = require('mongoose')

const Charity = mongoose.model('Charity', {
    id: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    ppl: {
        type: Number,
        required: false
    },
    date: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
})

module.exports = Charity