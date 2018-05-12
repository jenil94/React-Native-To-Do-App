import React, { Component } from 'react';
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	ScrollView,
	TextInput
} from 'react-native';
import Header from './Header';
import Input from './Input';
import DateTime from './DateTime';
import {getFireStoreToDORef} from '../FirebaseUtil';

class AddTask extends Component {
	constructor(props){
		super(props);
		const data = props.navigation.state && props.navigation.state.params || {};
		let today = data.date ? new Date(data.date) : new Date();
		today.setHours(0);
		today.setMinutes(0);
		today.setSeconds(0);
		today.setMilliseconds(0);
		this.state = {
			title: data.title || '',
			desc: data.desc || '',
			date: today.getTime(),
			location: data.location || '',
			startTime: data.startTime || '',
			endTime: data.endTime || '',
			completed: false,
			type: data.type || 'ADD',
			headerTitle: data.headerTitle || 'Add Task',
			id: data.id,
			editable: data.type === 'VIEW' ? false : true
		};
	}

	componentDidMount(){
		this.fireRef = getFireStoreToDORef();
	}

	componentWillReceiveProps(nextProps){
		const data = props.navigation.state && props.navigation.state.params || {};
		let today = props.date ? new Date(data.date) : new Date();
		today.setHours(0);
		today.setMinutes(0);
		today.setSeconds(0);
		today.setMilliseconds(0);
		this.setState({
			title: data.title || '',
			desc: data.desc || '',
			date: today.getTime(),
			location: data.location || '',
			startTime: data.startTime || '',
			endTime: data.endTime || '',
			completed: false,
			type: data.type || 'ADD',
			headerTitle: data.headerTitle || 'Add Task',
			id: data.id,
			editable: data.type === 'VIEW' ? false : true
		});
	}

	getDateInProperFormat = (date) => {
		date.setHours(0);
		date.setMinutes(0);
		date.setSeconds(0);
		date.setMilliseconds(0);
		this.setState({
			date: date.getTime()
		})
	}

	getItems = () => {
		return <View>
			<View style={styles['secondaryContainer']}>
				<Input value={this.state.title} onChangeText={(title) =>  this.setState({title})} showBottomBorder={true} lable="title" editable={this.state.editable}/>
				<Input value={this.state.desc} onChangeText={(desc) =>  this.setState({desc})} showBottomBorder={false} lable="description" editable={this.state.editable}/>
			</View>
			<View>
				{/* <Input value={this.state.date} onChangeText={(date) =>  this.setState({date})} showBottomBorder={true} lable="date"/> */}
				<DateTime editable={this.state.editable} showBottomBorder={true} onSubmit={(date) => {this.getDateInProperFormat(date)}} value={this.state.date} lable="Date"/>
				<View style={styles['timeContainer']}>
					<DateTime editable={this.state.editable} mode="time" lable="From" showBottomBorder={true} onSubmit={(startTime) => this.setState({startTime: startTime.getTime()})} value={this.state.startTime}/>
					<DateTime editable={this.state.editable} mode="time" lable="To" showBottomBorder={true} onSubmit={(endTime) => this.setState({endTime: endTime.getTime()})} value={this.state.endTime}/>
					{/* <Input value={this.state.startTime} onChangeText={(startTime) =>  this.setState({startTime})} showBottomBorder={true} lable="from"/>
					<Input value={this.state.endTime} onChangeText={(endTime) =>  this.setState({endTime})} showBottomBorder={true} lable="to"/> */}
				</View>
				<Input value={this.state.location} onChangeText={(location) =>  this.setState({location})} showBottomBorder={true} lable="location" editable={this.state.editable}/>
			</View>
		</View>
	}
	rightButtonAction = () => {
		if(this.state.title){
			this.addToDO();
		}
	}
	addToDO = () => {
		let dateStamp = new Date(this.state.date).getTime();
		this.fireRef.add({
			title: this.state.title,
			desc: this.state.desc,
			date: dateStamp,
			startTime: this.state.startTime,
			endTime: this.state.endTime,
			location: this.state.location
		}).then(()=>{
			this.props.navigation.navigate('Home');
		});
	}
	updateToDo = () => {
		let dateStamp = new Date(this.state.date).getTime();
		if(this.state.id){
			const docRef = this.fireRef.doc(this.state.id);
			docRef.update({
				title: this.state.title,
				desc: this.state.desc,
				date: dateStamp,
				startTime: this.state.startTime,
				endTime: this.state.endTime,
				location: this.state.location
			}).then(() => {
				this.props.navigation.navigate('Home');
			})
		}
	}
	navigateToEditTask = () => {
		this.props.navigation.navigate('AddTask', {
			'headerTitle': 'Edit Task',
			'type': 'EDIT',
			'title': this.state.title,
			'completed': this.state.completed,
			'location': this.state.location,
			'startTime': this.state.startTime,
			'date': this.state.date,
			'endTime': this.state.endTime,
			'id': this.state.id,
			'desc': this.state.desc
		});
	}
	getRightButtonConfig = () => {
		if(this.state.type === 'VIEW'){
			return {
				rightIcon: 'edit',
				rightButtonAction: this.navigateToEditTask
			}
		}
		else if(this.state.type === 'ADD'){
			return {
				rightIcon: 'done',
				rightButtonAction: this.addToDO
			}
		}
		else if(this.state.type === 'EDIT'){
			return {
				rightIcon: 'done',
				rightButtonAction: this.updateToDo
			}
		}
	}
	render() {
		const items = this.getItems();
		const rightButtonConfig = this.getRightButtonConfig();
		return <View style={styles['mainContainer']}>
			<Header title={this.state.headerTitle} rightButtonAction={rightButtonConfig.rightButtonAction} leftIcon="clear" rightIcon={rightButtonConfig.rightIcon} navigation={this.props.navigation}/>
			<ScrollView style={styles['mainContainer']}>
				{items}
			</ScrollView>
		</View>;
	}
}

const styles = StyleSheet.create({
	mainContainer: {
		backgroundColor: 'white',
		flex: 1,
		display: 'flex'
	},
	timeContainer: {
		display: 'flex',
		flexDirection: 'row',
		flex: 1
	},
	secondaryContainer: {
		backgroundColor: '#f8f8f9'
	}
});

export default AddTask;