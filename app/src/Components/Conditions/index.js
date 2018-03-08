import React, {render, Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class Conditions extends Component {
	constructor(props) {
    super(props);
    this.state = {
      pic:"sunface"
    };
  }

  render() {
	  var p ="";
	  console.log(this.props.condition);
	  var temp = this.props.condition;
	  if(temp=="Clear"  || temp=="Very Hot") p = "sunface";
	  else if(temp== "Partly Cloudy" || temp =="Mostly Cloudy") p="partcloudy";
	  else if(temp=="Cloudy" || temp=="Overcast") p = "cloudy";
	  else if(temp=="Very Cold") p = "cold";
	  else if(temp=="Chance of Flurries" || temp=="Chance of Freezing Rain" || temp=="Chance of Sleet" || temp=="Chance of Snow" || temp=="Freezing Rain" || temp=="Sleet" || temp=="Snow" || temp=="Flurries") p = "snow";
	  else if(temp=="Chance of Rain" || temp=="Chance Rain" || temp=="Rain") p = "rain";
	  else p="sunglasses";
	  
	  //this.setState({pic:p});
	  
    return (
    <div className="conditions">
        <div className="conditions_l">
            <div className="conditions_l_emoji"><img src ={require('../../Images/'+this.props.condition+'.png')} /></div>
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
