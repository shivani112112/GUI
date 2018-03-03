import React, {render, Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Api from '../Api';

class Conditions extends Component {


  render() {
    return (
    <div className="conditions">
    <div className="conditions.l">
        <div className="conditions.l.emoji">EMOJI</div>
        <div className="conditions.l.cond"><p>{this.props.condition}</p></div>
    </div>
      <div className="conditions.r">
          <div className="conditions.r.hi"><p>High:{this.props.hi}</p></div>
          <div className="conditions.r.temp"><p>Current Temperature:{this.props.temperature}</p></div>
          <div className="conditions.r.lo"><p>Lo:{this.props.lo}</p></div>
          <div className="conditions.r.fl"><p>Feelslike: {this.props.feelslike}</p></div>
      </div>
    </div>
    );
  }
}
export default Conditions;
