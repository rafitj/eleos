const express = require('express');
const cors = require('cors');


require('./db/mongoose')
const gfm_scraper = require('./scrapers/gfm_scraper');
const tileRouter = require('./routers/tile')
const Tile = require('./models/tile')

const app = express();
app.use(express.json())
app.use(cors());
app.use(tileRouter)


app.get('/', (req, res) => {
  res.json({
    message: 'Scraping is Fun!'
  });
});

app.get('/search/:query', (req, res) => {
  gfm_scraper
    .searchFundraiser(req.params.query)
    .then(fundraisers => {
      res.json(fundraisers);
      Tile.insertMany(fundraisers, (err, docs) => {
        if (err) {
          console.log(err)
        } else {
          console.log('data stored', docs.length);
        }
      });
    });
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
