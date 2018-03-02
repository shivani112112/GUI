import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Header extends Component {
  render() {
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
