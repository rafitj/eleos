const mongoose = require('mongoose')

const Tile = mongoose.model('Tile', {
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true
    }
})

module.exports  = Tile