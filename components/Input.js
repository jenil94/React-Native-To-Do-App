import React, { Component } from 'react';
import {
	Text,
	View,
	TextInput,
	StyleSheet
} from 'react-native';

class Input extends Component {
	render() {
		let secureTextEntry = false;
		if(this.props.secureTextEntry){
			secureTextEntry = this.props.secureTextEntry;
		}
		return (
			<View style={styles['textContainer']}>
				<Text style={styles['labelText']}>{this.props.lable.toUpperCase()}</Text>
				<TextInput editable={this.props.editable} onChangeText={(text) => {this.props.onChangeText(text)}} value={this.props.value} secureTextEntry={secureTextEntry} underlineColorAndroid='transparent' style={styles['textInput']}></TextInput>
				{this.props.showBottomBorder ? <View style={styles['border']}></View> : null}
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
	textInput: {
		fontSize: 16
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