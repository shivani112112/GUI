import React, { Component } from 'react';

class Rest extends Component {

	render() {
		var hourcells=[];
		var iconcells=[];
		//b,c,e,F
		if(this.props.hours==undefined){

		}else{
			//store hours with td tags in an array to make it easier to mount.
			console.log(this.props.icons);
			for(var i=0; i<this.props.hours.length ;i++){
			hourcells.push(<td>{this.props.hours[i]}</td>);
			var temp = this.props.icons[i]
			var p = 'sunface';

			//if statements to assign the name of the image we want to use to a variable, based on the current weather conditions.			   
			if(temp==="Clear"  || temp==="Very Hot" || temp==="Mostly Sunny" || temp==="Sunny") {
				//decide whether to use sun or moon based on sunset times.
				var d= new Date();
				var n= d.getHours();
				if(n>this.props.sunset||n<this.props.sunrise) p="moon2";
				else p ="sunface";
		  }
			  else if(temp=== "Partly Cloudy" || temp ==="Mostly Cloudy"|| temp==="Scattered Clouds" || temp==="Partly Sunny") p="partcloudy";
			  else if(temp==="Cloudy" || temp==="Overcast") p = "cloudy";
			  else if(temp==="Very Cold") p = "cold";
			  else if(temp==="Chance of Flurries" || temp==="Chance of Freezing Rain" || temp==="Chance of Sleet" || temp==="Chance of Snow" || temp==="Freezing Rain" || temp==="Sleet" || temp==="Snow" || temp==="Flurries") p = "snow";
			  else if(temp==="Chance of Rain" || temp==="Chance Rain" || temp==="Rain") p = "rain";
			  else if(temp==="Chance of Thunderstorms" || temp==="Chance of a Thunderstorm" || temp==="Thunderstorm" || temp==="Thunderstorms" || temp==="Unknown") p = "thunder";
			  else if(temp==="Fog"|| temp==="Haze") p="fog";





			//store icons with td tags in an array to make it easier to mount.
			iconcells.push(<td><img src={require('../../Images/'+p+'.png')} width="40px" height="40px" /></td>);
		}
		}
		return (
			<div className="rest">
				<table>
					<tbody>
						<tr>
							{hourcells}
						</tr>
						<tr>
							{iconcells}
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}
export default Rest;
