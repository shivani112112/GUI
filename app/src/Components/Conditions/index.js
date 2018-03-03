import React, {render, Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Api from '../Api';

class Conditions extends Component {


  render() {
    return (
    <div className="conditions">
    <div className="conditions_l">
        <div className="conditions_l_emoji">EMOJI</div>
        <div className="conditions_l_cond"><p>{this.props.condition}</p></div>
    </div>

      <div className="conditions_r">
          <div className="conditions_r_hilo"><p>High:{this.props.hi}</p></div>
          <div className="conditions_r_temp"><p>Current Temperature:{this.props.temperature}</p></div>
          <div className="conditions_r_hilo"><p>Lo:{this.props.lo}</p></div>
          <div className="conditions_r_fl"><p>Feelslike: {this.props.feelslike}</p></div>
      </div>

    </div>
    );
  }
}
export default Conditions;
