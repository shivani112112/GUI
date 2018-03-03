import React, {render, Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Api from '../Api';

class Conditions extends Component {


  render() {
    return (
    <div className="conditions">
        <div className="conditions_l">
            <div className="conditions_l_emoji"><img src={require('../../Images/newmoon.png')}/></div>
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
