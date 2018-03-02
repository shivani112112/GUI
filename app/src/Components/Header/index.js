import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Api from '../Api';

class Header extends Component {
  render() {
//https://d30y9cdsu7xlg0.cloudfront.net/png/14173-200.png
    return (
      <div>
      <div className="App-intro">
          <p>{this.props.example}</p>
      </div>
         <div align="left">
          <img src={require('../../Images/search.png')} height="50 px" width="50 px"/>
        </div>
      </div>
    );
  }


}
export default Header;
