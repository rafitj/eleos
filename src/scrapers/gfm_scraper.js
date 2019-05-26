const fetch = require('node-fetch');
const cheerio = require('cheerio');

const searchCache = {};
const fundraiserCache = {};

function searchFundraiser(searchTerm) {
    if (searchCache[searchTerm]) {
        console.log('Serving from cache:', searchTerm);
        return Promise.resolve(searchCache[searchTerm]);
    }
    const searchUrl = 'https://www.gofundme.com/mvc.php?route=homepage_norma/search&term=';
    return fetch(`${searchUrl}${searchTerm}`)
    .then(response => response.text())
    .then(body => {
      const $ = cheerio.load(body);
      const fundraisers = []
      $('.js-fund-tile').each(function(i, element) {
        const $element = $(element);
        const $link = $element.find('.campaign-tile-img--contain').attr('href');
        const link = $link.split('/')[3]
        const image = $element.find('.campaign-tile-img--contain').attr('data-original');
        const title = $element.find('.fund-title').first().text();
        fundraiser = {
            title,
            image,
            link
        }
        fundraisers.push(fundraiser);
      });
      searchCache[searchTerm] = fundraisers;
      return fundraisers
    });
}

function getFundraiser(link) {
    if(fundraiserCache[link]) {
        console.log('Serving from cache:', link);
        return Promise.resolve(fundraiserCache[link]);
    }
    const searchUrl = 'https://www.gofundme.com/';
    return fetch(`${searchUrl}${link}`)
    .then(response => response.text())
    .then(body => {
      const $ = cheerio.load(body);
      const numPeople = $('.campaign-status span').first().text();
      const description = $('.co-story').text().trim();
      const fundReached = $('.goal strong').first().text();
      const fundGoal = $('.goal span').first().text().trim().split(' ')[1];
      const datePublished = $('.created-date').first().text();
      const creator = $('.js-profile-co').first().text().trim();
      const image = $('.campaign-img').attr('src');
      const tag = $('.category-link-name .text-small').first().text();
      const title = $('.campaign-title').first().text().trim();
      const fundraiser = {
        title,
        description,
        datePublished,
        creator,
        fundReached,
        fundGoal,
        numPeople,
        tag,
        image,
        link
      };
      fundraiserCache[link] = fundraiser;
      return fundraiser
    });
}

module.exports = {
    searchFundraiser,
    getFundraiser
  };
