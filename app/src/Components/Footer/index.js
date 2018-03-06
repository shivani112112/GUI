import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      travel: [],
      service:[],
      id:[]
    };
  }

  getTravelInfo = ()=>{
    var url="https://api.tfl.gov.uk/Line/Mode/tube/Status?app_id=042a9bf8&app_key=9d8934a0357c9a355812182231507ae0"
    $.ajax({
      url: url,
      dataType: "json",
      success : this.parseTravelInfo,
      error : function(req, err){ console.log('API call failed ' + err); }
    })
  }

  parseTravelInfo = (parsed_json) =>{
    var ids=[];
    var names =[];
    var services = [];
    for(var i=0; i<11; i++ ){
     ids[i]=parsed_json[i]['id'];
     names[i]= parsed_json[i]['name'];
     services[i]=parsed_json[i]['lineStatuses'][0]['statusSeverityDescription'];


    }
    this.setState({travel:names, service: services, id:ids});
  }
  render() {
    var trav=[];
    for (var i = 0; i < 11; i++) {
      trav.push(<tr><td id={this.state.id[i]}>{this.state.travel[i]}</td><td>{this.state.service[i]}</td></tr>);
    }
				

    var takesmall=[];
	var takebig=[];
    if(this.props.Conditions == "rain"){
        takesmall.push(<img src={require('../../Images/umbrella.png')} height="40px" width="40px"/>);
  		takebig.push(<tr><td><img src={require('../../Images/umbrella.png')} height="40px" width="40px"/></td><td>It is currently raining so don't forget your umbrella!</td></tr>);
  }
	else if(this.props.cofr>50){
		takesmall.push(<img src={require('../../Images/umbrella.png')} height="40px" width="40px"/>);
		takebig.push(<tr><td><img src={require('../../Images/umbrella.png')} height="40px" width="40px"/></td><td>The chance of rain for today is {this.props.cofr}% today so dont forget your umbrella!</td></tr>);
	}
    if(this.props.Temperature<14 || this.props.low<10){
      takesmall.push(<img src={require('../../Images/jacket.png')} height="40px" width="40px"/>);
      if(this.props.Temperature<8 || this.props.low<4){
        takesmall.push(<img src={require('../../Images/hat.png')} height="40px" width="40px"/>);
        takesmall.push(<img src={require('../../Images/scarf.png')} height="40px" width="40px"/>);
      }
    }
    else if(this.props.Temperature>20 || this.props.high>25){
      takesmall.push(<img src={require('../../Images/suncream.png')} height="40px" width="40px"/>);
    }
    if(this.props.Conditions == "sunny" ){
        takesmall.push(<img src={require('../../Images/sunglasses.png')} height="40px" width="40px"/>);  
    }

      //  <button onClick={this.closeTravel.bind(this)}>
      //  </button>


    return (
      <div className="footer">

		      <button className="footer_take" onClick={this.showWhatToTake.bind(this)}><div><h3>What to take</h3>{takesmall}</div></button>
      		<button className="footer_travel" onClick={this.showTravel.bind(this)}><div><h3>Travel</h3></div></button>

          <div id="theTake"><button onClick={this.closeTake.bind(this)}>
			  	<h2>What to take</h2>
				<table>
					{takebig}
				</table>
		  </button ></div>

          <div id="theTravel"> <button onClick={this.closeTravel.bind(this)}>
			         <h2>
                Travel
              </h2><div className="scroll">
              <table>
                {trav}
              </table></div>

           </button></div>
      </div>


    );
  }
  showWhatToTake =(e) =>{
      document.getElementById("theTake").style.left="0%"
  }
  showTravel= (e) =>{
      this.getTravelInfo()
      document.getElementById("theTravel").style.left="0%"
  }

  closeTake= (e) =>{
      document.getElementById("theTake").style.left="-100%"
  }

  closeTravel= (e) =>{
      document.getElementById("theTravel").style.left="-100%"
  }

}
export default Footer;
