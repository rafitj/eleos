const mongoose = require('mongoose')

const Tile = mongoose.model('Tile', {
    link: {
        type: String,
        required: true
    }
})

module.exports  = Tile