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
              <div className="conditions_r_hilo">High:{this.props.hi}</div>
              <div className="conditions_r_temp">{this.props.temperature}</div>
              <div className="conditions_r_hilo">Lo:{this.props.lo}</div>
              <div className="conditions_r_fl">Feelslike: {this.props.feelslike}</div>
          </div>

    </div>
    );
  }
}
export default Conditions;
