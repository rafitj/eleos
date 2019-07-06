const mongoose = require('mongoose')

const Tile = mongoose.model('Tile', {
    id: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    trending: {
        type: Number,
        required: true
    },
    hearts: {
        type: Number,
        required: true
    },
    hlpId: {
        type: String,
        required: true
    }
})

module.exports = Tile