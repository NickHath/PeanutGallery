import axios from 'axios';

const initialState = {
  imdbID: '',
  reviews: [],
};

const GET_IMDB_ID = 'GET_IMDB_ID'
    , GET_REVIEWS = 'GET_REVIEWS';

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case GET_IMDB_ID + '_FULFILLED':
      return Object.assign({}, state, { imdbID: action.payload });
    case GET_REVIEWS + '_FULFILLED':
      return Object.assign({}, state, { reviews: action.payload });
    default:
      return state;
  }
}

export function getImdbID(title) {
  console.log(title);
  const results = axios.get(`http://localhost:4200/api/id/${title}`)
                       .then(res => res.data);
  return {
    type: GET_IMDB_ID,
    payload: results
  };
}