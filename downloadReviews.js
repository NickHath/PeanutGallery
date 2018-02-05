require('dotenv').config();
const fs = require('fs')
    , axios = require('axios');

function sendRequest(title) {
  const omdbApiKey = process.env.OMDB_API_KEY
      , omdbBaseUrl = 'http://www.omdbapi.com/';
  // console.log(`${omdbBaseUrl}?apikey=${omdbApiKey}&t=${title}`)
  axios.get(`${omdbBaseUrl}?apikey=${omdbApiKey}&t=${title}`)
        .then(response => console.log(response.data.imdbID))
        .catch(err => console.log('error!'));
}

fs.readFile('./movie_titles/animation_movie_titles.txt', 'utf-8', (err, data) => {
  let titles = data.split(',');
  titles = titles.map(title => title.toLowerCase().replace(/[^\x00-\x7F]/g, '').replace(/[-:']/g, '').replace(/\s/g, '%20'));
  titles.forEach((title, index) => {
    setTimeout(() => sendRequest(title), index * 150);
  });
});
