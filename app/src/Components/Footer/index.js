import React, { Component } from 'react';
import $ from 'jquery';

class Footer extends Component {
  constructor(props) {
    super(props);
      this.state = {
        travel: [],
        service:[],
        id:[],
	      trav: "greentick",
		    test: "warning"
      };
  }
	// call the api to get travel info
  getTravelInfo = ()=>{
    var url="https://api.tfl.gov.uk/Line/Mode/tube/Status?app_id=042a9bf8&app_key=9d8934a0357c9a355812182231507ae0"
    $.ajax({
      url: url,
      dataType: "json",
      success : this.parseTravelInfo,
      error : function(req, err){ console.log('API call failed ' + err); }
    })
  }
  //parse the json to get the required information and store it in arrays
  parseTravelInfo = (parsed_json) =>{
    var ids=[];
    var names =[];
    var services = [];
	  var changed = false;
	  var severe = false;
      for(var i=0; i<11; i++ ){
        ids[i]=parsed_json[i]['id'];
        names[i]= parsed_json[i]['name'];
        services[i]=parsed_json[i]['lineStatuses'][0]['statusSeverityDescription'];
	         if(services[i] === "Servere Delays"&&!severe){
		           this.setState({trav:"stop"});
		           severe = true;
	         }
	         else if(services[i] === "Minor Delays"&&!changed) {
		           this.setState({trav:"warning"});
		           changed=true;
	         }

    }
   this.setState({travel:names, service: services, id:ids});

  }
  render() {
	  //store train service in an array to make it easier to display when mounting
    var trav=[];
    for (var i = 0; i < 11; i++) {
      trav.push(<tbody><tr><td id={this.state.id[i]}>{this.state.travel[i]}</td><td>{this.state.service[i]}</td></tr></tbody>);
    }
	//store objects to take in an array based on if statements
    var takesmall=[];
	  var takebig=[];
	  //if it is currently raining displain ay emoji
      if(this.props.Conditions === "Rain"){
        takesmall.push(<img src={require('../../Images/umbrella.png')} height="40px" width="40px"/>);
        takebig.push(<tr><td><img src={require('../../Images/umbrella.png')} height="40px" width="40px"/></td><td>It is currently raining so dont forget to take your umbrella!</td></tr>);
      }
	  	//if chance of rain is higher than 50% display an emoji
	    else if(this.props.cofr>50){
		    takesmall.push(<img src={require('../../Images/umbrella.png')} height="40px" width="40px"/>);
		    takebig.push(<tr><td><img src={require('../../Images/umbrella.png')} height="40px" width="40px"/></td><td>The chance of rain for today is {this.props.cofr}% so dont forget to take your umbrella!</td></tr>);
	    }
		//if current tempweratre us less than 14 or low is less than 10 display jacket emoji
      if(this.props.Temperature<14 || this.props.low<10){
        takesmall.push(<img src={require('../../Images/jacket.png')} height="40px" width="40px"/>);
        takebig.push(<tr><td><img src={require('../../Images/jacket.png')} height="40px" width="40px"/></td><td>It's chilly outside, and the low for today will be {this.props.low}° so don't forget to take your jacket!</td></tr>);
			//if current tempweratre us less than 8 or low is less than 4 display jacket emoji
          if(this.props.Temperature<8 || this.props.low<4){
            takesmall.push(<img src={require('../../Images/hat.png')} height="40px" width="40px"/>);
            takebig.push(<tr><td><img src={require('../../Images/hat.png')} height="40px" width="40px"/></td><td>It's cold outside so don't forget to take your hat!</td></tr>);
            takesmall.push(<img src={require('../../Images/scarf.png')} height="40px" width="40px"/>);
            takebig.push(<tr><td><img src={require('../../Images/scarf.png')} height="40px" width="40px"/></td><td>It's cold outside so don't forget to take your scarf!</td></tr>);
          }
      }
	  //if current tempweratre us more than 20 or high is more than 25 display jacket emoji
      else if(this.props.Temperature>20 || this.props.high>25){
        takesmall.push(<img src={require('../../Images/suncream.png')} height="40px" width="40px"/>);
        takebig.push(<tr><td><img src={require('../../Images/suncream.png')} height="40px" width="40px"/></td><td>It's warm outside, so don't forget to take your suncream!</td></tr>);
      }
	  //if it is currently sunny display sunglasses emoji
      if(this.props.Conditions === "sunny" ){
        takesmall.push(<img src={require('../../Images/sunglasses.png')} height="40px" width="40px"/>);
        takebig.push(<tr><td><img src={require('../../Images/sunglasses.png')} height="40px" width="40px"/></td><td>It's sunny outside, so don't forget to take your sunglasses!</td></tr>);
        takesmall.push(<img src={require('../../Images/sunglasses.png')} height="40px" width="40px"/>);
      }
      return (
        <div className="footer">
            <div id="blur">
		          <button className="footer_take" onClick={this.showWhatToTake.bind(this)}><div><h3>What to take</h3>{takesmall}</div></button>
      		    <button className="footer_travel" onClick={this.showTravel.bind(this)}><div><h3>Travel</h3><img src ={require('../../Images/'+this.state.trav+'.png')} width="40px" height="40px" /><img src={require('../../Images/train.png')} height="40px" width="40px"/></div></button>
            </div>
            <div id="theTake">
              <button onClick={this.closeTake.bind(this)}>
                <h2 align="center">What to take</h2>
				            <table>
                      <tbody>
					             {takebig}
                      </tbody>
				            </table>
		          </button >
            </div>
            <div id="theTravel">
              <button onClick={this.closeTravel.bind(this)}>
			           <h2> Travel </h2>
                    <div className="scroll">
                        <table>
                          {trav}
                        </table>
                    </div>
              </button>
            </div>
        </div>
      );
  }
  //method to move the what to take window into display
  showWhatToTake = (e) =>{
      document.getElementById("theTake").style.left="0%"
      document.getElementById("blur").style="filter: blur(3px)";
      document.getElementById("blur2").style="filter: blur(3px)";
  }
  //method to move the travel window into display
  showTravel = (e) =>{
      this.getTravelInfo()
      document.getElementById("theTravel").style.left="0%"
      document.getElementById("blur").style="filter: blur(3px)";
      document.getElementById("blur2").style="filter: blur(3px)";
  }
  //method to move the what to take window out of display
  closeTake = (e) =>{
      document.getElementById("theTake").style.left="-100%"
      document.getElementById("blur").style="filter: blur(0px)";
      document.getElementById("blur2").style="filter: blur(0px)";
  }
  //method to move the travel window out of display
  closeTravel = (e) =>{
      document.getElementById("theTravel").style.left="-100%"
      document.getElementById("blur").style="filter: blur(0px)";
      document.getElementById("blur2").style="filter: blur(0px)";
  }

}
export default Footer;
