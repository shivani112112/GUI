import React, { Component } from 'react';

class Compare extends Component {

  render() {
	  //use if statements to compare the high and low temperatures of today with the high and low temperatures of yesterday to check if the temperature today will be generally warmer and cooler than yesterday
    	var comparison="yesterday";
      if(this.props.yHi>this.props.high && this.props.yLo> this.props.low) comparison="cooler than " +comparison;
      else if(this.props.yHi<this.props.high && this.props.yLo< this.props.low) comparison="warmer than "+ comparison;
      else comparison="same as " + comparison;

    return (
      <div className="compare">
          <p>{comparison}</p>
      </div>
    );
  }
}
export default Compare;
