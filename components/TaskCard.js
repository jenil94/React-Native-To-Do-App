import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableWithoutFeedback
} from 'react-native';
import { withNavigation } from 'react-navigation';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Icon from 'react-native-vector-icons/MaterialIcons';

class TaskCard extends Component {
	constructor(props){
		super(props);
	}
	_onPress = () => {
		this.props.navigation.navigate('AddTask', {
			'headerTitle': 'Details',
			'type': 'VIEW',
			'desc': this.props.desc,
			'title': this.props.title,
			'completed': this.props.completed,
			'location': this.props.location,
			'startTime': this.props.startTime,
			'endTime': this.props.endTime,
			'date': this.props.date,
			'id': this.props.id
		});
	}
	getTime = () => {
		if(this.props.startTime && this.props.endTime){
			let startTime = new Date(this.props.startTime),
				endTime = new Date(this.props.endTime);
			let startHour = startTime.getHours(),
				startMinute = startTime.getMinutes(),
				endHour = endTime.getHours(),
				endMinute = endTime.getMinutes();
			startSuffix = startHour > 12 ? 'PM' : 'AM'
			startHour = startHour > 12 ? startHour - 12 : startHour;
			endSuffix = endHour > 12 ? 'PM' : 'AM'
			endHour = endHour > 12 ? endHour - 12 : endHour;
			if(startSuffix === endSuffix){
				return `${startHour}:${startMinute} - ${endHour}:${endMinute} ${endSuffix}`
			}
			else{
				return `${startHour}:${startMinute} ${startSuffix} - ${endHour}:${endMinute} ${endSuffix}`
			}
		}
	}
	render() {
		let color = this.props.completed ? "#50d2c2" : "#ffb258";
		const time = this.getTime();
		return (
			<TouchableWithoutFeedback style={{backgroundColor: "rgba(0,0,0,.3)"}} onPress={this._onPress}>
			<View style={styles['mainContainer']}>
			<View style={styles['statusBar']}>
				<View style={{flex: 1, width:7, backgroundColor: color}}></View>
			</View>
			<View style={styles['container']}>
				<View style={styles['component']}>
					<Text style={[styles['title'], this.props.completed ? styles['strikeOff'] : null]}>
						{this.props.title}
					</Text>
					<View style={styles['secondaryContainer']}>
						<View style={styles['secondaryTitleContainer']}>
							<Text style={styles['secondaryTitleIcon']}>
								<Icon name="access-time" size={20} color="rgba(0,0,0,0.3)" />
							</Text>
							<Text style={[styles['secondaryTitle'], this.props.completed ? styles['strikeOff']: null]}>
								{time || "Anytime"}
							</Text>
						</View>
						<View style={styles['secondaryTitleContainer']}>
							<Text style={styles['secondaryTitleIcon']}>
								<Icon name="location-on" size={20} color="rgba(0,0,0,0.3)" />
							</Text>
							<Text style={[styles['secondaryTitle'], this.props.completed ? styles['strikeOff']: null]}>
								{this.props.location || "Anywhere"}
							</Text>
						</View>
					</View>
				</View>
			</View>
			</View>
			</TouchableWithoutFeedback>
		);
	}
}

const styles = StyleSheet.create({
	statusBar: {
		flex: 1
	},
	mainContainer: {
		backgroundColor: 'white',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	container: {
		backgroundColor: 'white',
		marginLeft: 30,
		marginRight: 20,
		borderBottomColor: 'rgba(0,0,0,0.05)',
		borderBottomWidth: 1,
		display: 'flex',
		flexDirection: 'row',
	},
	title: {
		color: '#1d1d26',
		fontSize: 17
	},
	component: {
		paddingTop: 20,
		paddingBottom: 20,
		flex: 4,
	},
	secondaryContainer: {
		display: 'flex',
		flexDirection: 'row',
	},
	secondaryTitleContainer: {
		opacity: .5,
		paddingRight: 30,
		paddingTop: 15,
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'row'
	},
	secondaryTitleIcon: {
		paddingRight: 10
	},
	secondaryTitle: {
		fontSize: 15,
		lineHeight: 20
	},
	doneBlock:{
		height: 10,
		width: 10,
		paddingRight: 20,
		paddingTop: 5,
	},
	strikeOff: {
		textDecorationLine: 'line-through',
		textDecorationStyle: 'solid'
	}
})

export default withNavigation(TaskCard);