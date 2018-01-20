require('dotenv').config();
const axios = require('axios')
    , fs = require('fs');

let totalPages = null;

let genres = {
    'adventure': 12,
    'action': 28,
    'animation': 16,
    'comedy': 35,
    'crime': 80,
    'documentary': 99,
    'drama': 18,
    'family': 10751,
    'fantasy': 14,
    'history': 36,
    'horror': 27,
    'music': 10402,
    'mystery': 9648,
    'romance': 10749,
    'sci-fi': 878,
    'tv-movie': 10770,
    'thriller': 53,
    'war': 10752,
    'western': 37
};

let genre = 'comedy';

axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=${genres[genre]}`)
     .then(res => {
        totalPages = res.data.total_pages;
        fs.appendFileSync('movieTitles.txt', `Genre: ${genre}\tTotal Results: ${res.data.total_results}\n`);
        getMovieTitles(1);

        for (let i = 2; i <= totalPages; i++) {
          setTimeout(() => getMovieTitles(i), i * 1000);
        }
     });

function getMovieTitles(page) {
  let movieTitles = '';
  console.log(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=${genres['comedy']}&page=${page}`);
  axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=${genres['comedy']}&page=${page}`)
       .then(res => {
        res.data.results.forEach(movie => {
          movieTitles += (movie.title + '\n');
        });  
        fs.appendFileSync('movieTitles.txt', movieTitles);
      });
}