import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Header from '../Header';

class SearchLocation extends Component {

  render() {

    return (
      <div className="searchlocation">
        <div>
          <h2>Enter a location</h2>
        </div>
		    <div>
          <input placeholder="Enter location"/>
        </div>
        <div>
          <button>Enter</button>
        </div>
      </div>

    );
  }


}
export default SearchLocation;
