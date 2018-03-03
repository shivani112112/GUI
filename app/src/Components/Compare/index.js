import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class Compare extends Component {


  render() {
    var max="yesterday";
    if(this.props.yHi>this.props.high && this.props.yLo> this.props.low){
      max="warmer than " +max;
    }
    else if(this.props.yHi<this.props.high && this.props.yLo< this.props.low){
      max="cooler than "+ max;
    }
    else{
      max="same as " + max;
    }
    return (
      <div>
      <div className="Compare">
          <p>{max}</p>
      </div>
      </div>
    );
  }


}
export default Compare;
