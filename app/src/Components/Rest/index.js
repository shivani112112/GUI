import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Api from '../Api';

class Rest extends Component {

	constructor(props) {
		super(props);
		this.state = {
			flag:true,
			hours:new Array(),
			icons:new Array()
		};
	}
	render() {
		if(this.state.flag){
			this.getHourly()
			this.state.flag=false
		}
		var gobz=[];
		var uz=[];
		for(var i=0; i<7 ;i++){
			gobz.push(<td>{this.state.hours[i]}</td>);
			uz.push(<td className={this.state.icons[i]}></td>);
	}
	return (
		<div className="rest">
			<table border="1px">
				<tbody>
					<div className="rest.times">
						<tr>
							{gobz}
						</tr>
					</div>
					<div className="rest.icons">
						<tr>
							{uz}
						</tr>
					</div>
				</tbody>
			</table>
		</div>
	);
}
		test = () => {
			console.log(this.props.Hour[1])
			console.log(this.props.Icon[1])
		}



		getHourly = () =>{
			$.ajax({
				url: "http://api.wunderground.com/api/61fa425d356c6fd4/hourly/q/UK/London.json",
				dataType: "jsonp",
				success : this.parseHourly,
				error : function(req, err){ console.log('API call failed ' + err); }
			})
		}


		parseHourly = (parsed_json) => {
			var hour=new Array();
			var icon= new Array();
			for (var i = 0; i < 7; i++) {
				hour[i]=parsed_json['hourly_forecast'][i]['FCTTIME']['civil'];
				icon[i]=parsed_json['hourly_forecast'][i]['icon'];
			}
			// var yHi=4;
			// var yLo=parsed_json['history']['mintempm'];
			//<h1> temp </h1>
			this.setState({hours:hour, icons:icon});
		}



	}
	export default Rest;
