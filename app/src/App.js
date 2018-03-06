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
import { Snackbar } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: true,
      location: "",
      locationLat: "",
      locationLong: "",
      temperature: "",
      condition:"",
      hi:"",
      lo:"",
      feelslike:"",
      yesterdayHi:"",
      yesterdayLo:"",
      rain:"",
      hours:[],
      icons:[],
      search1:""
    };
    this.setLocation.bind(this)
  }
  getLocation = () =>{
    if(this.state.search1!=""){
  	   var url="http://api.wunderground.com/api/87f7487f0bc89791/conditions/q/UK/"+this.state.search1+".json"
    $.ajax({
      url: url,
      dataType: "jsonp",
      success : this.parseConditions,
      error : function(req, err){ console.log('API call failed ' + err); }
    })
    $.ajax({
      url: "http://api.wunderground.com/api/87f7487f0bc89791/yesterday/q/UK/"+this.state.search1+".json",
      dataType: "jsonp",
      success : this.parseYesterday,
      error : function(req, err){ console.log('API call failed ' + err); }
    })

    $.ajax({
      url: "http://api.wunderground.com/api/87f7487f0bc89791/forecast10day/q/UK/"+this.state.search1+".json",
      dataType: "jsonp",
      success : this.parseForecast,
      error : function(req, err){ console.log('API call failed ' + err); }
    })
    $.ajax({
      url: "http://api.wunderground.com/api/87f7487f0bc89791/planner_07010731/q/UK/"+this.state.search1+".json",
      dataType: "jsonp",
      success : this.parseRain,
      error : function(req, err){ console.log('API call failed ' + err); }
    })
  	}
  	else{
  		var url="http://api.wunderground.com/api/87f7487f0bc89791/conditions/q/"+this.state.locationLat+","+this.state.locationLong+".json"
    $.ajax({
      url: url,
      dataType: "jsonp",
      success : this.parseConditions,
      error : function(req, err){ console.log('API call failed ' + err); }
    })
    $.ajax({
      url: "http://api.wunderground.com/api/87f7487f0bc89791/yesterday/q/"+this.state.locationLat+","+this.state.locationLong+".json",
      dataType: "jsonp",
      success : this.parseYesterday,
      error : function(req, err){ console.log('API call failed ' + err); }
    })

    $.ajax({
      url: "http://api.wunderground.com/api/87f7487f0bc89791/forecast10day/q/"+this.state.locationLat+","+this.state.locationLong+".json",
      dataType: "jsonp",
      success : this.parseForecast,
      error : function(req, err){ console.log('API call failed ' + err); }
    })
    $.ajax({
      url: "http://api.wunderground.com/api/87f7487f0bc89791/planner_07010731/q/"+this.state.locationLat+","+this.state.locationLong+".json",
      dataType: "jsonp",
      success : this.parseRain,
      error : function(req, err){ console.log('API call failed ' + err); }
    })
  	}
}

setLocation = () => {
  var temp = document.getElementById('search').value;
  temp.replace(" ","_");
  this.setState({search1: temp}
,() => {
  this.getLocation();
});

document.getElementById("header_dropdown").style.height="0%";
document.getElementById("header_dropdown").style.top="-40%";
  this.render();


}

  render() {
    this.hello()
    var d= new Date();
    var n= d.getHours()
    
    return (
      <div className="App">

      <div className="header">
          <div id="header_dropdown">

              <input  name="uzair" id="search"  />
              <button onClick={this.setLocation}> Go </button>

          </div>
          <div className="header_search"><button onClick={this.changeLocation.bind(this)}><img src={require('./Images/search.png')} height="20 px" width="20 px"/></button></div>
            <div className="header_location"><p align="center">{this.state.location}</p></div>
      </div>
        <Conditions temperature={this.state.temperature} condition={this.state.condition} feelslike={this.state.feelslike} hi={this.state.hi} lo={this.state.lo}/>
        <Rest/>
          <Compare yHi={this.state.yesterdayHi} yLo={this.state.yesterdayLo} high={this.state.hi} low={this.state.lo}/>
        <Footer Conditions={this.state.condition} Temperature={this.state.temperature} high={this.state.hi} low={this.state.lo} cofr={this.state.rain}/>
      </div>

    );
  }

  hello = () =>{
    navigator.geolocation.getCurrentPosition(this.success, this.error)
  }
  success = (pos) => {
  var crd = pos.coords;
  this.setState({locationLat:crd.latitude, locationLong:crd.longitude, search:this.state.locationLat+","+this.state.locationLong}
    ,() => {
      if(this.state.flag){
        var temp=this.state.locationLat+","+this.state.locationLong;
        this.getLocation()
        this.state.flag=false
    }
    }
  )
};

  error = (err) => {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};


changeLocation=(e)=> {
    document.getElementById("header_dropdown").style.height="5%";
    document.getElementById("header_dropdown").style.top="0%";
  }

  parseConditions = (parsed_json) => {
	var obs = parsed_json['current_observation']['observation_location']['city'];
	var disp = parsed_json['current_observation']['display_location']['city']
	var theLocation = disp+", "+obs.split(" ")[obs.split(" ").length-1];
    var temp = parsed_json['current_observation']['temp_c'];
    var cond = parsed_json['current_observation']['weather'];
    var fl= parsed_json['current_observation']['feelslike_c'];
    //<h1> temp </h1>
    this.setState({location: theLocation, temperature: temp, condition: cond, feelslike: fl});
  }
  parseYesterday = (parsed_json) => {
    var yHi=parsed_json['history']['dailysummary'][0]['maxtempm'];
    var yLo=parsed_json['history']['dailysummary'][0]['mintempm'];
    //<h1> temp </h1>
  this.setState({yesterdayHi:yHi, yesterdayLo:yLo});
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
