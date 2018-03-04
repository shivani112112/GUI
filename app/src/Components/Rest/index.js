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
			<table >
				<tbody>
					<div className="rest_times">
						<tr>
							{gobz}
						</tr>
					</div>
					<div className="rest_icons">
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
				url: "http://api.wunderground.com/api/1671bd6891040bea/hourly/q/UK/London.json",
				dataType: "jsonp",
				success : this.parseHourly,
				error : function(req, err){ console.log('API call failed ' + err); }
			})
		}


		parseHourly = (parsed_json) => {
			var hour=new Array();
			var icon= new Array();
			for (var i = 0; i < 7; i++) {
				var temp = parsed_json['hourly_forecast'][i]['FCTTIME']['civil'];
				temp = temp.split(" ")
				var temp1 = temp[0].split(":");
				hour[i]=temp1[0]+" "+temp[1];
				icon[i]=parsed_json['hourly_forecast'][i]['icon'];
			}
			// var yHi=4;
			// var yLo=parsed_json['history']['mintempm'];
			//<h1> temp </h1>
			this.setState({hours:hour, icons:icon});
		}



	}
	export default Rest;
