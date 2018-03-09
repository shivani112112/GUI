import React, { Component } from 'react';
import './App.css';
import Conditions from './Components/Conditions';
import Compare from './Components/Compare';
import Rest from './Components/Rest';
import Footer from './Components/Footer'

var apikey = "eb6c4f1b08b3f272";
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
		sunset: undefined
	}

	componentWillMount = async() => {
		await navigator.geolocation.getCurrentPosition(this.success, this.error);
	}

  searchdown=(e)=> {
		document.getElementById("header_dropdown").style.height="6%";
		document.getElementById("header_dropdown").style.top="0%";
  }

  success = async (pos) =>{
		var lat = await pos.coords.latitude;
		var lon = await pos.coords.longitude;
		loc = await lat+","+lon;
		latlon = await lat+","+lon;
		this.getWeather();
	}

  callSearch =(e) => {
    if(e) e.preventDefault();
    var city = e.target.elements.city.value;
		var country = e.target.elements.country.value;
		if (country=="" && city!="") loc = "UK/"+city;
		else if (country!="" && city!="") loc = country+"/"+city;
		else loc=latlon;
		this.getWeather();
		document.getElementById("header_dropdown").style.height="0%";
		document.getElementById("header_dropdown").style.top="-40%";
	}

	getWeather = async () =>{
		var apicall = await fetch('http://api.wunderground.com/api/eb6c4f1b08b3f272/conditions/q/'+loc+'.json');
		const conds = await apicall.json();
    
		apicall = await fetch('http://api.wunderground.com/api/eb6c4f1b08b3f272/yesterday/q/'+loc+'.json');
		const yest = await apicall.json();

		apicall = await fetch('http://api.wunderground.com/api/eb6c4f1b08b3f272/forecast10day/q/'+loc+'.json');
		const tenday = await apicall.json();

		apicall = await fetch('http://api.wunderground.com/api/eb6c4f1b08b3f272/planner_07010731/q/'+loc+'.json');
		const planner = await apicall.json();

		apicall = await fetch('http://api.wunderground.com/api/eb6c4f1b08b3f272/hourly/q/'+loc+'.json');
		const hourly = await apicall.json();

		var hour=[];
		var icon=[];
			for (var i = 0; i < 7; i++) {
				var temp = hourly.hourly_forecast[i].FCTTIME.civil;
				temp = temp.split(" ")
				var temp1 = temp[0].split(":");
				hour[i]=temp1[0]+" "+temp[1];
				icon[i]=hourly.hourly_forecast[i].condition;
			}

    apicall = await fetch('http://api.wunderground.com/api/eb6c4f1b08b3f272/astronomy/q/'+loc+'.json');
		const astronomy = await apicall.json();

		var sunr= astronomy.sun_phase.sunrise.hour;
		var suns= astronomy.sun_phase.sunset.hour;

		var n = new Date().getHours();
		let url= require("./Images/night.jpg")
    let url2= require("./Images/day.jpg")

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
			sunset: astronomy.sun_phase.sunset.hour
		});
	}

	render(){
    this.getWeather
      return(
		      <div id="App">
			       <div className="header">
				         <div id="header_dropdown">
					            <form onSubmit={this.callSearch}>
					                 <input  name="country" id="country" placeholder="UK" />
						               <input  name="city" id="city" placeholder="London" />
					                 <input type="submit" value="Go" />
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
                 <div className="header_share">
                    <button onClick={this.searchdown}>
                            <img src={require('./Images/share.png')} height="20 px" width="20 px"/>
                      </button>
                 </div>
			       </div>
			       <Conditions
				         temperature={this.state.temperature}
				         condition={this.state.condition}
				         feelslike={this.state.feelslike}
				         hi={this.state.hi}
				         lo={this.state.lo}
                 sunrise={this.state.sunrise}
                 sunset={this.state.sunset}
			       />
			       <Rest
				         hours={this.state.hours}
				         icons={this.state.icons}
                 sunrise={this.state.sunrise}
                 sunset={this.state.sunset}
			       />

             <div id="blur2">
			          <Compare
				            yHi={this.state.yesterdayHi}
				            yLo={this.state.yesterdayLo}
				            high={this.state.hi}
				            low={this.state.lo}
			          />
             </div>
             <Footer
				         Conditions={this.state.condition}
				         Temperature={this.state.temperature}
				         high={this.state.hi}
				         low={this.state.lo}
				         cofr={this.state.rain}
             />
          </div>

		);
	}

}
export default App;
