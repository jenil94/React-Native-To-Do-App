import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

class Header extends Component {
	goBack = () => {
		this.props.navigation && this.props.navigation.goBack();
	}
	rightButtonAction = () => {
		this.props.rightButtonAction && this.props.rightButtonAction();
	}
	render() {
		let rightIcon = this.props.rightIcon ? <TouchableOpacity onPress={this.rightButtonAction} style={styles['iconRight']}>
			<Icon name={this.props.rightIcon} size={30} color="rgba(0,0,0,0.3)" />
		</TouchableOpacity>
		: null;
		let leftIcon = this.props.leftIcon ? <TouchableOpacity onPress={this.goBack} style={styles['iconRight']}>
			<Icon name={this.props.leftIcon} size={30} color="rgba(0,0,0,0.3)" />
		</TouchableOpacity> : null;
		return (
			<View style={styles['headerContainer']}>
				{leftIcon}
				<View style={styles['titleContainer']}>
					<Text style={styles['title']}>{this.props.title}</Text>
				</View>
				{rightIcon}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	headerContainer: {
		display: 'flex',
		alignItems: 'center',
		height: 56,
		backgroundColor: 'white',
		elevation: 1,
		flexDirection: 'row'
	},
	titleContainer: {
		justifyContent: 'center',
		flex: 1,
		alignItems: 'center'
	},
	title: {
		fontSize: 20,
		color: '#1d1d26',
		fontWeight: '400'
	},
	iconRight: {
		paddingLeft: 10,
		paddingRight: 10
	}
});

export default Header;