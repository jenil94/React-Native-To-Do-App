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

class Login extends Component {
	state = {
		email: '',
		pass: ''
	};

	navigateToSignUp = () => {
		if(this.props.navigation){
			this.props.navigation.navigate('SignUp');
		}
	};

	signIn = () => {
		firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pass)
			.then((user) => {
				this.props.navigation.navigate('Home');
			})
			.catch((error) => {
				const {code, message} = error;
				let errorMessage;
				switch(code){
					case "auth/invalid-email":
						errorMessage = 'You have entered an invalid email';
						break;

					case "auth/user-disabled":
						errorMessage = 'User accound is not active';
						break;

					case "auth/user-not-found":
						errorMessage = 'User account not found';
						break;

					case "auth/wrong-password":
						errorMessage = 'You have entered an invalid password';
						break;
				}
				this.setState({
					error: errorMessage
				});
			});
	}

	render() {
		const error = this.state.error ? <View style={styles.errorContainer}>
				<Text style={styles.error}>
					{this.state.error}
				</Text>
			</View>
			: null;
		return (
			<ScrollView style={styles['loginContainer']}>
			<KeyboardAvoidingView behavior="padding" enabled>
				<View style={styles['iconContainer']}>
					<Icon name="user" size={120} color="#50d2c2" />
				</View>
				<View>
					<Input value={this.state.email} onChangeText={(email) =>  this.setState({email})} showBottomBorder={true} lable="email"/>
					<Input value={this.state.pass} onChangeText={(pass) =>  this.setState({pass})} showBottomBorder={true} secureTextEntry={true} type="PASSWORD" lable="password"/>
					{ error }
					<TouchableOpacity onPress={this.signIn} style={styles['button']}>
						<Text style={styles['buttonText']}>Sign In</Text>
					</TouchableOpacity>
				</View>
				<View style={styles['signUpText']}>
					<Text style={styles['label']}>{"Don't have an account?".toUpperCase()}</Text>
					<TouchableOpacity onPress={this.navigateToSignUp}>
						<Text style={styles['text']}>{"SIGN UP"}</Text>
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
		padding: 80,
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
	},
	errorContainer: {
		justifyContent: 'center',
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 10
	},
	error: {
		color: '#F22613'
	}
});

export default Login;