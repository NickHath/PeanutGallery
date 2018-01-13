import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getImdbID } from '../ducks/reducer';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      movieTitle: ''
    }
  }

  handleInput(input) {
    this.setState({ movieTitle: input });
  }

  handleClick() {
    this.props.getImdbID(this.state.movieTitle);
  }

  render() {
    return (
      <div className='search-wrapper'>
        <input onChange={(e) => this.handleInput(e.target.value) }/>
        <button onClick={() => this.handleClick() }>Get IMDB ID</button>
        { `Title: ${this.state.movieTitle}` }
        { `ID: ${this.props.imdbID}` }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, { getImdbID })(Search);