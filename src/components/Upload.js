import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getImdbID } from '../ducks/reducer';

import CsvParse from '@vtex/react-csv-parse';

class Upload extends Component {
  constructor() {
    super();
    this.state = {
      data: null
    }
  }

  handleData (data) {
    this.setState({ data });
  }

  getReviews(title) {
    this.props.getImdbID
  }

  render() {
    const fileHeaders = ['title'];
    console.log(this.state);
    return (
      <div className='search-wrapper'>
        <CsvParse fileHeaders={fileHeaders}
                  onDataUploaded={this.handleData}
                  render={onChange => <input type='file' onChange={ onChange } />}
        />
        <input placeholder='Category/Label' />
        <input placeholder='Max. # Reviews' />
        <button>Scrape Reviews</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, { getImdbID })(Upload);