const gfm_scraper = require('../scrapers/gfm_scraper');
const change_scraper = require('../scrapers/change_scraper');
const Charity = require('../models/charity')

function collectAll(query){
    const list = []
    gfm_scraper
      .searchFundraiser(query)
      .then((fundraisers) => {
        list.push(fundraisers)
        Charity.insertMany(fundraisers, (err, docs) => {
          if (err) {
            console.log(err)
          } else {
            console.log('data stored', docs.length);
          }
        });
      })
      .catch((err) => console.log(err))
    change_scraper
    .searchChangePetition(query)
    .then((petitions) => {
      list.push(petitions)
      Charity.insertMany(petitions, (err, docs) => {
        if (err) {
          console.log(err)
        } else {
          console.log('data stored', docs.length);
        }
      });
      return res.json(list);
    })
    .catch((err) => console.log(err))
}


module.exports = {
    collectAll
}