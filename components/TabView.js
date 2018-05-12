import React, { Component } from 'react';
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity
} from 'react-native';

class TabCard extends Component {
	navigate = () => {
		if(!this.props.isActive){
			this.props.onClick && this.props.onClick(this.props.data);
		}
	};
	render(){
		const activeColor = 'white';
		return <TouchableOpacity onPress={this.navigate} style={[TabCardStyles['container'], this.props.isActive ? TabCardStyles['active']: null]}>
			<Text style={[TabCardStyles['day'], this.props.isActive ? {color: activeColor, opacity: 1} : null]}>{this.props.data.dayName}</Text>
			<Text style={[TabCardStyles['date'], this.props.isActive ? {color: activeColor} : null]}>{this.props.data.date}</Text>
		</TouchableOpacity>
	}
};

const TabCardStyles = StyleSheet.create({
	container: {
		display: 'flex',
		flex: 1,
		alignItems: 'center',
		paddingTop: 16,
		paddingBottom: 16
	},
	active: {
		backgroundColor: '#50d2c2'
	},
	date:{
		paddingTop: 4,
		paddingBottom: 4,
		color: '#1d1d26'
	},
	day: {
		paddingBottom: 4,
		paddingTop: 4,
		color: '#1d1d26',
		opacity: 0.5
	}
});

class TabView extends Component {
	getData = () => {
		const data = [
			{
				'date': '7',
				'day': 'SUN'
			},
			{
				'date': '8',
				'day': 'MON'
			},
			{
				'date': '9',
				'day': 'TUE',
				'active': true
			},
			{
				'date': '10',
				'day': 'WED'
			},
			{
				'date': '11',
				'day': 'THU'
			},
			{
				'date': '12',
				'day': 'FRI'
			},
			{
				'date': '13',
				'day': 'SAT'
			}
		]
		return data;
	};

	getItems = (data) => {
		if(Array.isArray(data) && data.length){
			return data.map((item, index) => {
				let isActive = this.props.activeIndex === index;
				return <TabCard onClick={this.onSelect} navigation={this.props.navigation} data={item} isActive={isActive} key={index} />
			});
		}
	};

	onSelect = (data) => {
		this.props.onTabChange && this.props.onTabChange(data)
	}

	render() {
		const data = this.getData(),
			items = this.getItems(this.props.data);
		return <View style={TabViewStyles['container']}>
			{items}
		</View>;
	}
}

const TabViewStyles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection : 'row',
		backgroundColor: '#f8f8f9'
	}
});

export default TabView;