import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import Conditions from './Components/Conditions';
import Compare from './Components/Compare';
import Rest from './Components/Rest';
import Footer from './Components/Footer'
import Api from './Components/Api';
import $ from 'jquery';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: true,
      location: "",
      temperature: "",
      condition:"",
      hi:"",
      lo:4,
      feelslike:10,
      yesterdayHi:20,
      yesterdayLo:10,
      rain:"",
      hours:new Array(),
      icons:new Array()
    };
  }
  getLocation = () =>{
  $.ajax({
    url: "http://api.wunderground.com/api/61fa425d356c6fd4/conditions/q/UK/London.json",
    dataType: "jsonp",
    success : this.parseConditions,
    error : function(req, err){ console.log('API call failed ' + err); }
  })
  $.ajax({
    url: "http://api.wunderground.com/api/61fa425d356c6fd4/yesterday/q/UK/London.json",
    dataType: "jsonp",
    success : this.parseYesterday,
    error : function(req, err){ console.log('API call failed ' + err); }
  })

  $.ajax({
    url: "http://api.wunderground.com/api/61fa425d356c6fd4/forecast10day/q/UK/London.json",
    dataType: "jsonp",
    success : this.parseForecast,
    error : function(req, err){ console.log('API call failed ' + err); }
  })
  $.ajax({
    url: "http://api.wunderground.com/api/61fa425d356c6fd4/planner_07010731/q/UK/London.json",
    dataType: "jsonp",
    success : this.parseRain,
    error : function(req, err){ console.log('API call failed ' + err); }
  })
}

  render() {
    if(this.state.flag){
      this.getLocation()
      this.state.flag=false
  }

    return (
      <div className="App">
        <Api/>
        <Header example={this.state.location} />
        <Conditions temperature={this.state.temperature} condition={this.state.condition} feelslike={this.state.feelslike} hi={this.state.hi} lo={this.state.lo}/>
        <Compare yHi={this.state.yesterdayHi} yLo={this.state.yesterdayLo} high={this.state.hi} low={this.state.lo}/>
        <Rest/>
        <Footer Conditions={this.state.condition} Temperature={this.state.temperature} high={this.state.hi} low={this.state.lo} cofr={this.state.rain}/>
      </div>

    );
  }
  parseConditions = (parsed_json) => {
    var theLocation = parsed_json['current_observation']['observation_location']['city'];
    var temp = parsed_json['current_observation']['temp_c'];
    var cond = parsed_json['current_observation']['weather'];
    var fl= parsed_json['current_observation']['feelslike_c'];
    //<h1> temp </h1>
    this.setState({location: theLocation, temperature: temp, condition: cond, feelslike: fl});
  }
  parseYesterday = (parsed_json) => {
    // var yHi=4;
    // var yLo=parsed_json['history']['mintempm'];
    //<h1> temp </h1>
  //  this.setState({yesterdayHi:yHi, yesterdayLo:yLo});
  }
  parseForecast = (parsed_json) => {
    var high=parsed_json['forecast']['simpleforecast']['forecastday'][0]['high']['celsius']
    var low=parsed_json['forecast']['simpleforecast']['forecastday'][0]['low']['celsius']
    this.setState({hi:high, lo:low});
  }
  parseRain = (parsed_json) => {
    var Rain=parsed_json['trip']['chance_of']['chanceofrainday']['percentage']
    this.setState({rain:Rain});
  }

}


export default App;
