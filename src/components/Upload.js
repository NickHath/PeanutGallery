import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getImdbID } from '../ducks/reducer';

import CsvParse from '@vtex/react-csv-parse';
import axios from 'axios';

class Upload extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      imdbIDs: []
    }
  }

  handleData = data => {
    this.setState({ data });
  }

  handleClick = title => {
    // Consolidate https requests on the back-end
    // Just send entire file of titles, then let the back-end handle
    // all the calls... otherwise there's an insufficient resource error in the
    // browser
    // for (let i = 0; i < 5000; i++) {
    //   this.props.getImdbID(this.state.data[i].title);
    // }
    let titles = { category: 'test', titles: this.state.data };
    axios.post('http://localhost:4200/api/titles', titles);
  }

  render() {
    const fileHeaders = ['title'];
    const allImdbIDs = this.props.imdbIDs.forEach(id => <p>id</p>);
    console.log(this.props.imdbIDs);
    return (
      <div className='search-wrapper'>
        <CsvParse fileHeaders={ fileHeaders }
                  onDataUploaded={ this.handleData }
                  render={ onChange => <input type='file' onChange={ onChange } /> }
        />
        <input placeholder='Category/Label' />
        <input placeholder='Max. # Reviews' />
        <button onClick={ this.handleClick }>Send Movie Titles -> Server</button>
         { allImdbIDs }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, { getImdbID })(Upload);