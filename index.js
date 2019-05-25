const express = require('express');
const cors = require('cors');

const gfm_scraper = require('./gfm_scraper');

const app = express();
app.use(cors());

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
