import React, {render, Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Api from '../Api';

class Conditions extends Component {


  render() {
    return (
    <div>
    <div className="left" align="left">
        <p>EMOJI</p>
        <p>{this.props.condition}</p>
    </div>
      <div className="conditions" align="right">
          <<p>High:{this.props.hi}</p>
          <p>Current Temperature:{this.props.temperature}</p>
          <p>Lo:{this.props.lo}</p>
          <p>Feelslike: {this.props.feelslike}</p>
      </div>

      <div className="left" align="left">
          <p>EMOJI</p>
          <p>{this.props.condition}</p>
      </div>
    </div>
    );
  }
}
export default Conditions;
