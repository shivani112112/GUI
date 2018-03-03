import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Header from '../Header';
import Conditions from '../Conditions';

class Api extends Component {

  constructor(props) {
    super(props);
    this.state = {
      flag: true,
      location: "Hello",
      temperature: "",
      condition:"",
      hi:10,
      lo:4,
      feelslike:10
    };
  }

  getLocation = () =>{
  $.ajax({
    url: "http://api.wunderground.com/api/61fa425d356c6fd4/conditions/q/UK/London.json",
    dataType: "jsonp",
    success : this.parseResponse,
    error : function(req, err){ console.log('API call failed ' + err); }
  })
}
  printLocation = () => {
    return this.state.location;
  }

  render() {
    return (
      <div className="App">

      </div>

    );
  }


}
export default Api;
