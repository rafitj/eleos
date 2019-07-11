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
      const links = []
      const searchItems = $('.search-result')
      searchItems.each(function(i, element) {
        const $element = $(element);
        const link = $element.find('.js-click-search-result').attr('href');
        links.push(link)
      })
      const petitions = processLinks(links)
      return petitions
    });
}

async function processLinks(links) {
  const list = []
  for (const link of links) {
    const item = await getChangePetition(link);
    list.push(item);
  }
  return list
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
        creator : 'Rafit',
        image,
        link,
        type: 'petition',
        origin: 'change'
      };
      return petition
    });
}

module.exports = {
  searchChangePetition
}