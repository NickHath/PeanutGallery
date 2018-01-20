require('dotenv').config();
const axios = require('axios');

// uses page parameter for offset ?page=2
module.exports = {
  getTitles: (req, res) => {
    // Should get all pages using info from first get request
    let allTitles = [], numPages = null;
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=18&page=${req.query.page}`)
         .then(response => res.status(200).send(response.data.results))
         .catch(err => res.status(500).send(err));
  }
}