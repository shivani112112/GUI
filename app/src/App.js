import React, { Component } from 'react';
import './App.css';
import Conditions from './Components/Conditions';
import Compare from './Components/Compare';
import Rest from './Components/Rest';
import Footer from './Components/Footer';

var latlon = undefined;
var loc="/UK/london";

class App extends Component {
	//declare all state varibales as undefined as they will be set later using api
	state = {
		location: undefined,
		locationcont: undefined,
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

	//componentWillMount runs before the page is rendered, before the componened it mounted onto the page
	//this method makes a call to get the current location of the user and executes the success function if successful
	componentWillMount = () => {
		navigator.geolocation.getCurrentPosition(this.success, this.error);
	}

	//success method for when getting the users current location. The method gets the users latitude and longitude coordinates and stores them in a variable which will be concatenated with the api url, also stores them in the location variable which will be used to call the api
	success =  (pos) =>{
		var lat =  pos.coords.latitude;
		var lon =  pos.coords.longitude;
		loc =  lat+","+lon;
		latlon =  lat+","+lon;
		//call to the method to make the api call and get current weather details
		this.getWeather();
	}

	//method that will run when getting the users current location is unsuccessful, gets the weather for the last searched for location instead
	error = () => {
		//call to the method to make the api call and get current weather details
		this.getWeather();
	}

	//method to bring the search boxes down when the user clicks the search button
	searchdown=(e)=> {
		document.getElementById("header_dropdown").style.height="6%";
		document.getElementById("header_dropdown").style.top="0%";
    document.getElementById("blur3").style= "filter: blur(3px)";
  	}

	//method to run when the user searches for a specific place, stores the country and city in a variable and this will be concatenated onto the url, and then calls the method to make the api calls.
	callSearch =(e) => {

		if(e) e.preventDefault(); //stop the page refreshing when the user submits search
		var city = e.target.elements.city.value;
		var country = e.target.elements.country.value;
		if (country==="" && city!=="") loc = "UK/"+city;
		else if (country!=="" && city!=="") loc = country+"/"+city;
		else loc=latlon;
		this.getWeather();
		//make the search bar go back up
		document.getElementById("header_dropdown").style.height="0%";
		document.getElementById("header_dropdown").style.top="-40%";
		document.getElementById("blur3").style= "filter: blur(0px)";
	}

	//method to allow the user to share the weather by redirecting them to twiiter with the current temp
	share = (e)=>{
		console.log("Shared");
		var text= "It is " + this.state.temperature + " degrees right now";
		window.location.assign("https://twitter.com/intent/tweet?url=&text="+text);
  	}

	//meathod to call the api to get the weather
	getWeather = async () =>{
		//calls the api (for each bit of information needed) and parses the file as a json which is then stored in a variable.
		var apicall = await fetch('http://api.wunderground.com/api/61fa425d356c6fd4/conditions/q/'+loc+'.json');
		const conds = await apicall.json();

		apicall = await fetch('http://api.wunderground.com/api/61fa425d356c6fd4/yesterday/q/'+loc+'.json');
		const yest = await apicall.json();

		apicall = await fetch('http://api.wunderground.com/api/61fa425d356c6fd4/forecast10day/q/'+loc+'.json');
		const tenday = await apicall.json();

		apicall = await fetch('http://api.wunderground.com/api/61fa425d356c6fd4/planner_07010731/q/'+loc+'.json');
		const planner = await apicall.json();

		apicall = await fetch('http://api.wunderground.com/api/61fa425d356c6fd4/hourly/q/'+loc+'.json');
		const hourly = await apicall.json();

		//store hourly information from json in arrays, format the time to say the hour and AM/PM
		var hour=[];
		var icon=[];
			for (var i = 0; i < 7; i++) {
				var temp = hourly.hourly_forecast[i].FCTTIME.civil;
				temp = temp.split(" ")
				var temp1 = temp[0].split(":");
				hour[i]=temp1[0]+" "+temp[1];
				icon[i]=hourly.hourly_forecast[i].condition;
			}

		apicall = await fetch('http://api.wunderground.com/api/61fa425d356c6fd4/astronomy/q/'+loc+'.json');
		const astronomy = await apicall.json();


		//use sunrise and sunset times to set the background
		var sunr= astronomy.sun_phase.sunrise.hour;
		var suns= astronomy.sun_phase.sunset.hour;
		//get the current hour of the day
		var n = new Date().getHours();
		let url= require("./Images/night.jpg")
    	let url2= require("./Images/day.jpg")

		//set backgorund based on current time compared with sunset and sunrise times
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

		//set all the states based on the jsons returned from the api calls
		this.setState({
			location: conds.current_observation.display_location.city,
			locationcont: conds.current_observation.display_location.country,
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
		//mount the components in order that they will be displayed on the page
      return(
		      <div id="App">
			       <div className="header">
				         <div id="header_dropdown">
					            <form onSubmit={this.callSearch}>
					                 <input  name="country" id="country" placeholder="UK" />
						               <input  name="city" id="city" placeholder="London" />
					                 <input id="go" type="submit" value="Go" />
					            </form>
				         </div>
                 <div id="blur3">
				         <div>
					            <button onClick={this.searchdown}>
						                <img src={require('./Images/search.png')} height="20 px" width="20 px"/>
					            </button>
				         </div>
				         <div className="header_location">
					            <p align="center">{this.state.location}</p>
				         </div>
                 <div className="header_share">
                    <button onClick={this.share}>
                            <img src={require('./Images/share.png')} height="20 px" width="20 px"/>
                      </button>
                 </div>
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
