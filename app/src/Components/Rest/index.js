import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Api from '../Api';

class Rest extends Component {

	render() {
		
		var hourcells=[];
		var iconcells=[];
		//b,c,e,F
		if(this.props.hours==undefined){
			
		}else{
			for(var i=0; i<this.props.hours.length ;i++){
			hourcells.push(<td>{this.props.hours[i]}</td>);
			var url = "https://icons.wxug.com/i/c/f/"+this.props.icons[i]+".gif";
			iconcells.push(<td><img src={url} /></td>);
		}
		}
		return (
			<div className="rest">
				<table>
					<tr>
						{hourcells}
					</tr>
					<tr>
						{iconcells}
					</tr>
				</table>
			</div>
		);
	}



}
export default Rest;
