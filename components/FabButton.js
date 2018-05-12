import React, { Component } from 'react';
import {
	Text, TouchableOpacity, StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

class FabButton extends Component {
	handleOnPress = () => {
		this.props.navigation && this.props.navigation.navigate('AddTask')
	}
	render() {
		return (
			<TouchableOpacity onPress={this.handleOnPress} style={styles['mainContainer']}>
				<Icon name="add" size={30} color="white" />
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	mainContainer: {
		position: 'absolute',
		width: 50,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		right: 30,
		bottom: 30,
		backgroundColor: '#50d2c2',
		elevation: 8,
		borderRadius: 25
	}
})

export default FabButton;