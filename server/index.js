// required packages
require('dotenv').config();
const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , app = express();

// controllers
const imdbController = require('./controllers/imdbController')
    , tmdbController = require('./controllers/tmdbController');

app.use(bodyParser.json());
app.use(cors());

// api endpoint that react will use to get reviews
// should take an a movie title and return all of its reviews
app.get(`/api/id/:title`, imdbController.titleToID);
app.get(`/api/reviews/:id`, imdbController.getReviews);

app.get(`/api/titles`, tmdbController.getTitles);

app.listen(process.env.BACKEND_PORT, () => console.log(`I'm listening... on port ${process.env.BACKEND_PORT}`));