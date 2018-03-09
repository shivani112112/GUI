import React, {Component } from 'react';

class Conditions extends Component {

  render() {
	  var p ="sunface";
	  var temp = this.props.condition;
	  if(temp==="Clear"  || temp==="Very Hot" || temp==="Mostly Sunny" || temp==="Sunny") {
		  	var d= new Date();
		  	var n= d.getHours();
<<<<<<< HEAD
<<<<<<< HEAD
		  	if(n>this.props.sunset||n<this.props.sunrise) p="moon2";
			else p ="sunface";
=======
		  	if(n>this.props.sunset||n<this.props.sunrise) p="newmoon";
			  else p ="sunface";
>>>>>>> 08b74b1b4db1312c5a712806bb7de2931c11d917
=======
		  	if(n>this.props.sunset||n<this.props.sunrise) p="newmoon";
			  else p ="sunface";
>>>>>>> 08b74b1b4db1312c5a712806bb7de2931c11d917
	  }
	  else if(temp=== "Partly Cloudy" || temp ==="Mostly Cloudy"|| temp==="Scattered Clouds" || temp==="Partly Sunny") p="partcloudy";
	  else if(temp==="Cloudy" || temp==="Overcast") p = "cloudy";
	  else if(temp==="Very Cold") p = "cold";
	  else if(temp==="Chance of Flurries" || temp==="Chance of Freezing Rain" || temp==="Chance of Sleet" || temp==="Chance of Snow" || temp==="Freezing Rain" || temp==="Sleet" || temp==="Snow" || temp==="Flurries") p = "snow";
	  else if(temp==="Chance of Rain" || temp==="Chance Rain" || temp==="Rain") p = "rain";
	  else if(temp==="Chance of Thunderstorms" || temp==="Chance of a Thunderstorm" || temp==="Thunderstorm" || temp==="Thunderstorms" || temp==="Unknown") p = "thunder";
	  else if(temp==="Fog"|| temp==="Haze") p="fog";

    return (
      <div className="conditions">
        <div className="conditions_l">
          <div className="conditions_l_emoji"><img src ={require('../../Images/'+p+'.png')} alt="condition"/></div>
          <div className="conditions_l_cond"><p>{this.props.condition}</p></div>
        </div>
        <div className="conditions_r">
          <div className="conditions_r_hilo">H:    {this.props.hi}&#176;</div>
          <div className="conditions_r_temp">{this.props.temperature}&#176;</div>
          <div className="conditions_r_hilo">L:    {this.props.lo}&#176;</div>
          <div className="conditions_r_fl">Feels like: {this.props.feelslike}&#176;</div>
        </div>
      </div>
    );
  }
}
export default Conditions;
