const algoliasearch = require('algoliasearch')
const client = algoliasearch(process.env.ALG_APP_ID,process.env.ALG_API_KEY)
const index = client.initIndex('charaties')
const Charity = require('../models/charity');

function algoliaPush(){
    const objects = Charity.find({})
    console.log(objects)
    index.addObjects([objects], (err, content) => {
    console.log(err);
    });
}


module.exports = {
    algoliaPush
}