import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import SearchLocation from '../SearchLocation';
window.jQuery = $;

class Header extends Component {


  render() {
    return (

      <div className="header">
          <div id="header_dropdown">
            <form action="../App.js" method="post">
              <input name="uzair" placeHolder="Gobihan"/>
              <input name="Submit" type="submit" value="Find Location" />
            </form>
          </div>
          <div className="header_search"><button onClick={this.changeLocation.bind(this)}><img src={require('../../Images/search.png')} height="20 px" width="20 px"/></button></div>
            <div className="header_location"><p align="center">{this.props.location}</p></div>

      </div>

    );
  }
  changeLocation=(e)=> {
      document.getElementById("header_dropdown").style.height="10%";
      document.getElementById("header_dropdown").style.top="0%";
    }

}

export default Header;
