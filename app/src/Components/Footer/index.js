import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class Footer extends Component {

  render() {
    var take=[];
    if(this.props.cofr>50 || this.props.Conditions == "rain"){
        take.push(<img src={require('../../Images/umbrella.png')} height="40px" width="40px"/>);
    }
    if(this.props.Temperature<14 || this.props.low<10){
      take.push(<img src={require('../../Images/jacket.png')} height="40px" width="40px"/>);
      if(this.props.Temperature<8 || this.props.low<4){
        take.push(<img src={require('../../Images/hat.png')} height="40px" width="40px"/>);
        take.push(<img src={require('../../Images/scarf.png')} height="40px" width="40px"/>);
      }
    }
    else if(this.props.Temperature>20 || this.props.high>25){
      take.push(<img src={require('../../Images/suncream.png')} height="40px" width="40px"/>);
    }
    if(this.props.Conditions == "sunny" ){
        take.push(<img src={require('../../Images/sunglasses.png')} height="40px" width="40px"/>);
    }
    return (
      <div className="footer">
		  <div className="footer_take"><h3>What to take</h3>{take}</div>
      		<div className="footer_travel"></div>
      </div>

    );
  }


}
export default Footer;
