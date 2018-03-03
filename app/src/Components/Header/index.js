import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Api from '../Api';

class Header extends Component {
  render() {
    return (

      <div className="header">
          <div className="header.search"><img src={require('../../Images/search.png')} height="30 px" width="20 px" align="left"/></div>
            <div className="header.location"><p align="center">{this.props.location}</p>

      </div>

    );
  }

  success = (pos) => {
  var crd = pos.coords;

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
};

error = (err) => {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};
  hello = () =>{
    console.log(navigator.geolocation.getCurrentPosition(this.success, this.error));
  }
}

export default Header;
