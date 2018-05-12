import React, { Component } from 'react';
import {
	Text, View,
	StyleSheet,
	TouchableOpacity,
	KeyboardAvoidingView,
	ScrollView
} from 'react-native';
import Input from './Input';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'react-native-firebase';

class SignUp extends Component {
	state = {
		name: '',
		email: '',
		pass: ''
	};
	navigateToSignIn = () => {
		if(this.props.navigation){
			this.props.navigation.navigate('Login');
		}
	};
	SignUp = () => {
		firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pass)
			.then((user) => {
			})
			.catch((error) => {
				const {code, message} = error;
				console.log(code, message);
			});
	}
	render() {
		return (
			<ScrollView style={styles['loginContainer']}>
			<KeyboardAvoidingView behavior="padding" enabled>
				<View style={styles['iconContainer']}>
					<Icon name="user" size={90} color="#50d2c2" />
				</View>
				<View>
					<Input value={this.state.name} onChangeText={(name) =>  this.setState({name})} showBottomBorder={true} lable="fullname"/>
					<Input value={this.state.email} onChangeText={(email) =>  this.setState({email})} showBottomBorder={true} lable="email"/>
					<Input value={this.state.pass} onChangeText={(pass) =>  this.setState({pass})} showBottomBorder={true} secureTextEntry={true} type="PASSWORD" lable="password"/>
					<TouchableOpacity  onPress={this.SignUp} style={styles['button']}>
						<Text style={styles['buttonText']}>Create</Text>
					</TouchableOpacity>
				</View>
				<View style={styles['signUpText']}>
					<Text style={styles['label']}>{"Already have an account?".toUpperCase()}</Text>
					<TouchableOpacity onPress={this.navigateToSignIn}>
						<Text style={styles['text']}>{"SIGN IN"}</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	loginContainer: {
		backgroundColor: 'white',
		flex: 1
	},
	iconContainer: {
		alignItems: 'center',
		padding: 60,
		justifyContent: 'center'
	},
	button: {
		backgroundColor: '#50d2c2',
		justifyContent: 'center',
		alignItems: 'center',
		height: 60,
		marginTop: 40,
		marginRight: 20,
		marginLeft: 20
	},
	buttonText:{
		color: 'white',
		fontSize: 16
	},
	signUpText:{
		marginTop: 30,
		marginBottom: 30,
		justifyContent: 'center',
		display: 'flex',
		flexDirection : 'row'
	},
	label:{
		letterSpacing: 1.33,
		color: '#1d1d26',
		opacity: .5
	},
	text: {
		marginLeft: 6,
		letterSpacing: 1.33,
		opacity: 1,
		color: "#1d1d26"
	}
});

export default SignUp;