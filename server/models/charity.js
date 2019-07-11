const mongoose = require('mongoose')
const mongoolia = require('mongoolia').default;
require('dotenv').config();

const charitySchema = new mongoose.Schema( {
    description: {
        type: String,
        required: true,
        algoliaIndex: true 
    },
    title: {
        type: String,
        required: true,
        algoliaIndex: true 
    },
    creator: {
        type: String,
        required: true,
        algoliaIndex: true 
    },
    link: {
        type: String,
        required: true,
        algoliaIndex: true 
    },
    ppl: {
        type: Number,
        required: false,
        algoliaIndex: true 
    },
    date: {
        type: String,
        required: false,
        algoliaIndex: true 
    },
    image: {
        type: String,
        required: false,
        algoliaIndex: true 
    },
    origin: {
        type: String,
        required: true,
        algoliaIndex: true 
    },
    type: {
        type: String,
        required: true,
        algoliaIndex: true 
    }
})

const Charity = mongoose.model('Charity', charitySchema)

charitySchema.plugin(mongoolia, {
    appId: process.env.ALG_APP_ID,
    apiKey: process.env.ALG_API_KEY,
    indexName: 'charity'
  })

module.exports = Charity