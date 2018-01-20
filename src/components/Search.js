import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getImdbID, getTitles } from '../ducks/reducer';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      movieTitle: '',
      titles: []
    }
  }

  handleInput(input) {
    this.setState({ movieTitle: input });
  }

  handleClick() {
    this.props.getImdbID(this.state.movieTitle);
  }
  
  getTitles() {
    this.props.getTitles();
  }

  render() {
    console.log(this.props.titles);
    const allTitles = this.props.titles.map(title => <p>{ title.title }</p>);
    return (
      <div className='search-wrapper'>
        <input onChange={(e) => this.handleInput(e.target.value) }/>
        <button onClick={() => this.handleClick() }>Get IMDB ID</button>
        { `Title: ${this.state.movieTitle}` }
        { `ID: ${this.props.imdbID}` }
        <button onClick={ () => this.getTitles() }>Get Titles for Genre 18</button>
        { allTitles }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, { getImdbID, getTitles })(Search);