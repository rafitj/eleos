const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');

require('./db/mongoose')
const gfm_scraper = require('./scrapers/gfm_scraper');
const change_scraper = require('./scrapers/change_scraper');
const tileRouter = require('./routers/tile')
const Charity = require('./models/charity')
const schema = require('./qlschema/schema')
const app = express();
app.use(express.json())
app.use(cors());
app.use(tileRouter)

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.get('/', (req, res) => {
  res.json({
    message: 'Scraping is Fun!'
  });
});

app.get('/search/:query', (req, res) => {
  const list = []
  gfm_scraper
    .searchFundraiser(req.params.query)
    .then((fundraisers) => {
      console.log(fundraisers)
      list.push(fundraisers)
      // Charity.insertMany(fundraisers, (err, docs) => {
      //   if (err) {
      //     console.log(err)
      //   } else {
      //     console.log('data stored', docs.length);
      //   }
      // });
    })
    .catch((err) => console.log(err))
  change_scraper
  .searchChangePetition(req.params.query)
  .then((petitions) => {
    list.push(petitions)
    // Charity.insertMany(petitions, (err, docs) => {
    //   if (err) {
    //     console.log(err)
    //   } else {
    //     console.log('data stored', docs.length);
    //   }
    // });
    return res.json(list);
  })
  .catch((err) => console.log(err))
});

app.get('/fundraiser/:link', (req, res) => {
  gfm_scraper
    .getFundraiser(req.params.link)
    .then(fundraiser => {
      res.json(fundraiser);
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
