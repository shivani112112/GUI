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

class App extends Component {
	state = {
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
		sunset: undefined
	}


	searchdown=(e)=> {
		document.getElementById("header_dropdown").style.height="10%";
		document.getElementById("header_dropdown").style.top="0%";
    }
	
	searchup = (e) => {
		document.getElementById("header_dropdown").style.height="0%";
		document.getElementById("header_dropdown").style.top="-40%";
	}
	
	getWeather = async (e) =>{
		
		
		e.preventDefault();
		
		var place = e.target.elements.place.value;
		console.log(place);
		
		var apicall = await fetch('http://api.wunderground.com/api/87f7487f0bc89791/conditions/q/UK/london.json');
		const conds = await apicall.json();
		console.log(conds);
		
		apicall = await fetch('http://api.wunderground.com/api/87f7487f0bc89791/yesterday/q/UK/london.json');
		const yest = await apicall.json();
		console.log(yest);
		
		apicall = await fetch('http://api.wunderground.com/api/87f7487f0bc89791/forecast10day/q/UK/london.json');
		const tenday = await apicall.json();
		console.log(tenday);
		
		apicall = await fetch('http://api.wunderground.com/api/87f7487f0bc89791/planner_07010731/q/UK/london.json');
		const planner = await apicall.json();
		console.log(planner);
		
		
		apicall = await fetch('http://api.wunderground.com/api/87f7487f0bc89791/hourly/q/UK/london.json');
		const hourly = await apicall.json();
		console.log(hourly);
		var hour=[];
		var icon=[];
			for (var i = 0; i < 7; i++) {
				var temp = hourly.hourly_forecast[i].FCTTIME.civil;
				temp = temp.split(" ")
				var temp1 = temp[0].split(":");
				hour[i]=temp1[0]+" "+temp[1];
				icon[i]=hourly.hourly_forecast[i].icon;
			}
		
		
		apicall = await fetch('http://api.wunderground.com/api/87f7487f0bc89791/astronomy/q/UK/london.json');
		const astronomy = await apicall.json();
		console.log(astronomy);
		var sunr: astronomy.sun_phase.sunrise.hour;
		var suns: astronomy.sun_phase.sunset.hour;
		var n = new Date().getHours;
		let url= require("./Images/night.jpg")
    	let url2= require("./Images/day.jpg")
		console.log(n+" hours")
		
		this.setState({
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
			sunset: astronomy.sun_phase.sunset.hour
			
		});
		
		
	}

	render(){
		
		this.getWeather
		
		return(
		<div id="App">
			<div className="header">	
				<div id="header_dropdown">
					<form onSubmit={this.getWeather}>
					  <input  name="place" id="searchBox" placeHolder="Gobihan" />
					  <input type="submit" value="Go" />
					</form>
				</div>
				<div className="header_search">
					<button onClick={this.searchdown}>
						<img src={require('./Images/search.png')} height="20 px" width="20 px"/>
					</button>
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
				cofr={this.state.rain}/>
		</div>
			
		);
	}

};


export default App;
