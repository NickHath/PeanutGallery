require('dotenv').config();
const axios = require('axios')
    , cheerio = require('cheerio')
    , fs = require('fs');

// sample imdb titles
// I, Tanya - tt5580036
// Jaws - tt0073195
// The Godfather - tt0068646

module.exports = {
  reviewsFromTitles: (req, res) => {
    const omdbApiKey = process.env.OMDB_API_KEY
        , omdbBaseUrl = 'http://www.omdbapi.com/';

    let { category, titles } = req.body;

    // remove non-ASCII characters and replace ' ' with '%20'
    titles = titles.map(movie => movie.title.toLowerCase().replace(/[^\x00-\x7F]/g, '').replace(/[-:']/g, '').replace(/\s/g, '%20'));
    titles = titles.slice(0, 2000);
    let urls = titles.map(title => axios.get(`${omdbBaseUrl}?apikey=${omdbApiKey}&t=${title}`));
    axios.all(urls)
         .then(results => {
            let imdbIDs = results.map(response => response.data.imdbID);
            console.log(imdbIDs);
          })
          .catch(err => console.log(err));
  },

  getReviews: (req, res) => {
    let numReviews = 0
      , paginationKey = ''
      , baseUrl = `http://www.imdb.com/title/${req.params.id}/reviews/_ajax`
      , reviewsTXT = '';

    scrapeReviews(baseUrl);    

    // -------------------------- //
    function scrapeReviews(url) {
      axios.get(url)
           .then(response => {
             let $ = cheerio.load(response.data);
             $('.text').each((index, element) => {
               // remove all newlines and carriage returns
               reviewsTXT += $(element).text().replace(/(\r\n|\n|\r)/gm,' ');
               numReviews++;
             });
             // set paginationKey if it exists
             paginationKey = $('.load-more-data').attr('data-key');
              if (paginationKey) {
                scrapeReviews(`${baseUrl}?paginationKey=${paginationKey}`);
              } else {
                res.status(200).send(numReviews + '\n' + reviewsTXT);
              }
           })
           .catch(err => res.status(500).send(err));
         }
  },


  titleToID: (req, res) => {
    let title = req.params.title;
    let imdbID = ''
      , omdbApiKey = process.env.OMDB_API_KEY
      , omdbBaseUrl = 'http://www.omdbapi.com/';

    if (title === undefined) {
      res.status(500).send('User has not passed in a valid title.');
    }

    title = title.toLowerCase().replace(' ', '%20');
    axios.get(`${omdbBaseUrl}?apikey=${omdbApiKey}&t=${title}`)
         .then(response => {
            imdbID = response.data.imdbID;
            if (imdbID) {
              res.status(200).send(imdbID);
            } else {
              res.status(500).send('No valid IMDB ID found.');
            }
          });
  }
}