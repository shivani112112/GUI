import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Api from '../Api';

class Header extends Component {
  render() {
    return (

      <div className="header">
          <div className="header.search"><img src={require('../../Images/search.png')} height="20 px" width="20 px" align="left"/></div>
            <div className="header.location"><p align="center">{this.props.location}</p></div>

      </div>

    );
  }
}

export default Header;
