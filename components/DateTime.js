import React, { Component } from 'react';
import {
	Text,
	View,
	TextInput,
	StyleSheet,
	TouchableWithoutFeedback
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

class Input extends Component {

	state = {
		isDateTimePickerVisible: false
	};

	_showDateTimePicker = () => {
		if(this.props.editable){
			this.setState({ isDateTimePickerVisible: true })
		}
	};

	_hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

	_handleDatePicked = (date) => {
	  this._onSubmit(date);
	  this._hideDateTimePicker();
	}

	_onSubmit = (date) => {
		this.props.onSubmit && this.props.onSubmit(date);
	}

	getDateString = () => {
		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		let date = this.props.value && new Date(this.props.value);
		if(this.props.mode === "time"){
			if(date){
				let hours = date.getHours(),
				minutes = date.getMinutes();
				let prefix = 'am';
				if(hours > 12){
					hours = hours - 12;
					prefix = 'pm'
				}
				minutes = minutes.toString();
				if(minutes.length === 1){
					minutes = '0' + minutes;
				}
				return `${hours}:${minutes}${prefix}`;
			}
			return "HH:MM";
		}
		else {
			if(!date){
				date = new Date();
			}
			let month = months[date.getMonth()],
				year = date.getFullYear(),
				day = date.getDate();
			return `${month} ${day}, ${year}`;
		}
	}

	render() {
		const value = this.getDateString();
		return (
			<View style={styles['textContainer']}>
				<Text style={styles['labelText']}>{this.props.lable && this.props.lable.toUpperCase()}</Text>
				<TouchableWithoutFeedback style={styles['valueContainer']} onPress={this._showDateTimePicker}>
					<View>
						<Text style={styles['textInput']}>
							{value}
						</Text>
					</View>
				</TouchableWithoutFeedback>
				{this.props.showBottomBorder ? <View style={styles['border']}></View> : null}
				<DateTimePicker
					isVisible={this.state.isDateTimePickerVisible}
					onConfirm={this._handleDatePicked}
					onCancel={this._hideDateTimePicker}
					mode={this.props.mode}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	textContainer: {
		paddingRight: 20,
		paddingLeft: 20,
		paddingTop: 20,
		flex: 1
	},
	valueContainer: {
		height: 58,
	},
	textInput: {
		paddingTop: 20,
		paddingBottom: 20,
		fontSize: 16,
		color: "#1d1d26"
	},
	labelText: {
		letterSpacing: 1.33,
		fontSize: 12
	},
	border: {
		height: 1,
		backgroundColor: '#1d1d26',
		opacity: .1
	}
});

export default Input;