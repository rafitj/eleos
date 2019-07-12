const algoliasearch = require('algoliasearch')
const client = algoliasearch('20WYW758LC','10ffb5700e25692e3487b91f63aef839')
const index = client.initIndex('charity')
const Charity = require('../models/charity');
function algoliaPush(){
    Charity.find({}, function(err, charities) {
        const list = []
        charities.forEach(function(charity) {
            list.push(charity)
        });
        console.log(list.length)
        index.addObjects(list, (err, content) => {
            console.log(err);
        });
        return list
    });
}

// async function algoliaPush(){
//     const objects = await getObjects()
//     console.log(objects)
//     index.addObjects([objects], (err, content) => {
//     console.log(err);
//     });
// }


module.exports = {
    algoliaPush
}