const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function searchFundraiser(searchTerm) {
    const searchUrl = 'https://www.gofundme.com/mvc.php?route=homepage_norma/search&term=';
    return fetch(`${searchUrl}${searchTerm}`)
    .then(response => response.text())
    .then(body => {
      const $ = cheerio.load(body);
      const links = []
      const searchItems = $('.js-fund-tile')
      searchItems.each(function(i, element) {
        const $element = $(element);
        const $link = $element.find('.campaign-tile-img--contain').attr('href');
        const link = $link.split('/')[3]
        links.push(link)
      });
      const fundraisers = processLinks(links)
      return fundraisers
    });
}

async function processLinks(links) {
  const list = []
  for (const link of links) {
    const item = await getFundraiser(link);
    list.push(item);
  }
  return list
}

function getFundraiser(link) {
    const searchUrl = 'https://www.gofundme.com/';
    return fetch(`${searchUrl}${link}`)
    .then(response => response.text())
    .then(body => {
      const $ = cheerio.load(body);
      const ppl = $('.campaign-status span').first().text();
      const description = $('.co-story').text().trim();
      const fundReached = $('.goal strong').first().text();
      const fundGoal = $('.goal span').first().text().trim().split(' ')[1];
      const date = $('.created-date').first().text();
      const creator = $('.js-profile-co').first().text().trim();
      const image = $('.campaign-img').attr('src');
      const tag = $('.category-link-name .text-small').first().text();
      const title = $('.campaign-title').first().text().trim();
      const fundraiser = {
        link,
        title,
        description,
        date,
        creator,
        ppl,
        image,
        type: 'fundraiser',
        origin: 'gfm'
      };
      return fundraiser
    });
}

module.exports = {
    searchFundraiser
  };
