import React, { Component } from 'react';
import './App.css';
import Conditions from './Components/Conditions';
import Compare from './Components/Compare';
import Rest from './Components/Rest';
import Footer from './Components/Footer'
import {
  FacebookShareButton,
} from 'react-share';

var apikey = "87f7487f0bc89791";
var latlon = undefined;
var loc="/UK/london";

class App extends Component {
	state = {
		location: undefined,
		temperature: undefined,
		condition: undefined,
		feelslike: undefined,
		hi: undefined,
		lo: undefined,
		yHi: undefined,
		yLo: undefined,
		rain: undefined,
		hours: undefined,
		icons: undefined,
		sunrise: undefined,
		sunset: undefined,
    travel: undefined,
    service: undefined,
    id: undefined,
    changed:undefined,
    severe:undefined
	}

	componentWillMount = async() => {

		await navigator.geolocation.getCurrentPosition(this.success, this.error);

//		this.getWeather();
	}




	searchdown=(e)=> {
		document.getElementById("header_dropdown").style.height="10%";
		document.getElementById("header_dropdown").style.top="0%";
    }



	success = async (pos) =>{
		console.log(pos);
		var lat = await pos.coords.latitude;
		var lon = await pos.coords.longitude;
		loc = await lat+","+lon;
		latlon = await lat+","+lon;
		console.log(loc);
		this.getWeather();
	}

	callSearch =(e) => {

		if(e) e.preventDefault();

			var city = e.target.elements.city.value;
			var country = e.target.elements.country.value;
			console.log(city+" "+country);
			if (country=="" && city!="") loc = "UK/"+city;
			else if (country!="" && city!="") loc = country+"/"+city;
			else loc=latlon;

		this.getWeather();
		document.getElementById("header_dropdown").style.height="0%";
		document.getElementById("header_dropdown").style.top="-40%";
	}

	getWeather = async () =>{


		var apicall = await fetch('http://api.wunderground.com/api/87f7487f0bc89791/conditions/q/'+loc+'.json');
		const conds = await apicall.json();
		console.log(conds);

		apicall = await fetch('http://api.wunderground.com/api/87f7487f0bc89791/yesterday/q/'+loc+'.json');
		const yest = await apicall.json();
		console.log(yest);

		apicall = await fetch('http://api.wunderground.com/api/87f7487f0bc89791/forecast10day/q/'+loc+'.json');
		const tenday = await apicall.json();
		console.log(tenday);

		apicall = await fetch('http://api.wunderground.com/api/87f7487f0bc89791/planner_07010731/q/'+loc+'.json');
		const planner = await apicall.json();
		console.log(planner);

		apicall = await fetch('http://api.wunderground.com/api/87f7487f0bc89791/hourly/q/'+loc+'.json');
		const hourly = await apicall.json();
		console.log(hourly);

		var hour=[];
		var icon=[];
			for (var i = 0; i < 7; i++) {
				var temp = hourly.hourly_forecast[i].FCTTIME.civil;
				temp = temp.split(" ")
				var temp1 = temp[0].split(":");
				hour[i]=temp1[0]+" "+temp[1];
				icon[i]=hourly.hourly_forecast[i].condition;
			}


		apicall = await fetch('http://api.wunderground.com/api/87f7487f0bc89791/astronomy/q/'+loc+'.json');
		const astronomy = await apicall.json();
		console.log(astronomy);
		var sunr: astronomy.sun_phase.sunrise.hour;
		var suns: astronomy.sun_phase.sunset.hour;
		var n = new Date().getHours();
		let url= require("./Images/night.jpg")
    let url2= require("./Images/day.jpg")
		console.log(n+" hours");


		if(n>suns || n<sunr){
      document.getElementById("App").style.background='url(' + url + ')';
      document.getElementById("App").style.backgroundRepeat= "no-repeat";
    	document.getElementById("App").style.backgroundSize="cover";
    }
    else{
      document.getElementById("App").style.background='url(' + url2 + ')';
      document.getElementById("App").style.backgroundRepeat= "no-repeat";
    	document.getElementById("App").style.backgroundSize="cover";
    }

    apicall = await fetch('https://api.tfl.gov.uk/Line/Mode/tube/Status?app_id=042a9bf8&app_key=9d8934a0357c9a355812182231507ae0');
		const travel = await apicall.json();
		console.log(travel);

    var ids=[];
    var names =[];
    var services = [];
    for(var i=0; i<11; i++ ){
     ids[i]=travel[i].id;
     console.log(ids[i])
     names[i]= travel[i].name;
     services[i]=travel[i].lineStatuses[0].statusSeverityDescription;
    }
		this.setState({
			location: conds.current_observation.display_location.city,
			temperature: conds.current_observation.temp_c,
			condition: conds.current_observation.weather,
			feelslike: conds.current_observation.feelslike_c,
			yHi: yest.history.dailysummary[0].maxtempm,
			yLo: yest.history.dailysummary[0].mintempm,
			hi: tenday.forecast.simpleforecast.forecastday[0].high.celsius,
			lo: tenday.forecast.simpleforecast.forecastday[0].low.celsius,
			hours: hour,
			icons: icon,
			rain: planner.trip.chance_of.chanceofrainday.percentage,
			sunrise: astronomy.sun_phase.sunrise.hour,
			sunset: astronomy.sun_phase.sunset.hour,
      travel:names,
      service:services,
      id:ids,
      changed:false,
      severe:false
		});


	}

	render(){


		this.getWeather

		return(
		<div id="App">
			<div className="header">
				<div id="header_dropdown">
					<form onSubmit={this.callSearch}>
					  <input  id ="country" name="country" id="country" placeHolder="UK" />
						<input  id ="city" name="city" id="city" placeHolder="London" />
					  <input id="go" type="submit" value="Go" />
					</form>
				</div>
				<div className="header_search">
					<button onClick={this.searchdown}>
						<img src={require('./Images/search.png')} height="20 px" width="20 px"/>
					</button>
				</div>
				<div className="header_location">
					<p align="center">{this.state.location}</p>
				</div>
			</div>

			<Conditions
				temperature={this.state.temperature}
				condition={this.state.condition}
				feelslike={this.state.feelslike}
				hi={this.state.hi}
				lo={this.state.lo}
			/>


			<Rest
				hours={this.state.hours}
				icons={this.state.icons}
			/>


			<Compare
				yHi={this.state.yesterdayHi}
				yLo={this.state.yesterdayLo}
				high={this.state.hi}
				low={this.state.lo}
			/>


			<Footer
				Conditions={this.state.condition}
				Temperature={this.state.temperature}
				high={this.state.hi}
				low={this.state.lo}
				cofr={this.state.rain}
        travel={this.state.travel}
        service={this.state.service}
        id={this.state.id}
        changed={this.state.changed}
        severe={this.state.severe}
        />
		</div>

		);
	}

};


export default App;
