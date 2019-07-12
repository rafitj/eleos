const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const tileRouter = require('./routers/tile')
const schema = require('./qlschema/schema')
const app = express();
const collect = require('./main/collect');
const alg = require('./main/search');

require('dotenv').config();

require('./db/mongoose')

app.use(express.json())
app.use(cors());
app.use(tileRouter)

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.get('/', (req, res) => {
  res.json({
    message: 'Home'
  });
});

app.get('/search/:query', (req, res) => {
  alg.algoliaPush()
  // return res.json(collect.collectAll(req.params.query))
});

app.get('/fundraiser/:link', (req, res) => {
  gfm_scraper
    .getFundraiser(req.params.link)
    .then(fundraiser => {
      res.json(fundraiser);
    });
});

const port = process.env.PORT || 2000;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
