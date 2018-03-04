import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
window.jQuery = $;
//require('geocomplete');

class Header extends Component {
  componentDidMount() {
  const self = this;

  $('.header_search').on('click', function(e) {
    e.preventDefault();
    $('.add-location-dialog').slideDown();
  });
}

  render() {
    return (

      <div className="header">
          <div className="header_search"><img src={require('../../Images/search.png')} height="20 px" width="20 px" align="left"/></div>
            <div className="header_location"><p align="center">{this.props.location}</p></div>

      </div>

    );
  }


}

export default Header;
