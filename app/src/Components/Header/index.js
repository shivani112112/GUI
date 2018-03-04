import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import SearchLocation from '../SearchLocation';
window.jQuery = $;

class Header extends Component {


  render() {
    return (

      <div className="header">
          <button onClick={this.changeLocation.bind(this)}><div className="header_search"><img src={require('../../Images/search.png')} height="20 px" width="20 px"/></div></button>
          <div className="header_location"><p align="center">{this.props.location}</p></div>
      </div>

    );
  }
  changeLocation=(e)=> {
    console.log("Hello")

    }

}

export default Header;
