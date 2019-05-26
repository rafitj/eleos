const fetch = require('node-fetch');
const cheerio = require('cheerio');

function searchChangePetition(searchTerm) {
    const searchUrl = 'https://www.change.org/search?offset=';
    const searchUrl2 = '&q=';
    const page = 0;
    return fetch(`${searchUrl}${page}${searchUrl2}${searchTerm}`)
    .then(response => response.text())
    .then(body => {
      const $ = cheerio.load(body);
      const petitions = []
      $('.search-result').each(function(i, element) {
        const $element = $(element);
        const link = $element.find('.js-click-search-result').attr('href');
        const image = $element.find('.flex-embed-cover-image').attr('style').split('\'')[1];
        const title = $element.find('h3.mtn.mbn.prxs.xs-mbs').text().trim();
        petition = {
            title,
            image,
            link,
            type: 'petition',
            origin: 'change'
        }
        console.log(petition)
        petitions.push(petition);
      });
      return petitions
    });
}

function getChangePetition(link) {
    const searchUrl = 'https://www.change.org';
    return fetch(`${searchUrl}${link}`)
    .then(response => response.text())
    .then(body => {
      const $ = cheerio.load(body);
      
      const description = $('.rte.js-description-content').text();
      const creator = $('strong.type-s.type-weak a.link-subtle').first().text().trim();
      const image = $('.image-cropper-nodrag').attr('src');
      const title = $('.petition-title').first().text().trim();
      const petition = {
        title,
        description,
        creator,
        image,
        link,
        type: 'petition',
        origin: 'gfm'
      };
      console.log(petition)
      return petition
    });
}

module.exports = {
  getChangePetition,
  searchChangePetition
}