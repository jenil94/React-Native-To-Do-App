/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
	Platform,
	StyleSheet,
	Text,
	View,
	ActivityIndicator
} from "react-native";
import Home from "./components/Home";
import RootNavigator from "./Screens";
import firebase from "react-native-firebase";
import { setUser, getUser } from "./FirebaseUtil";

class ScreenOverlay extends Component {
	constructor(){
		super();
		this.state = {
			shown: false
		}
	}

	showScreenOverlay = () => {
		this.setState({shown: true});
	}

	hideScreenOverlay = () => {
		this.setState({shown: false});
	}

	render(){
		let screen = <View></View>;
		if(this.state.shown){
			screen = <View style={styles['screenOverlay']}>
				<ActivityIndicator size={40} color="#50d2c2" />
			</View>;
		}
		return screen;
	}
}

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			loading: true,
			isLoggedIn: false
		};
	}

	componentDidMount() {
		this.authSubscription = firebase.auth().onAuthStateChanged(user => {
			setUser(user);
			this.setState({
				loading: false,
				isLoggedIn: user ? true : false
			});
		});
	}

	componentWillUnmount() {
		this.authSubscription();
	}

	render() {
		if (this.state.loading) {
			return (
				<View style={styles["loadingContainer"]}>
					<ActivityIndicator size={40} color="#50d2c2" />
				</View>
			);
		}
		const Layout = RootNavigator(this.state.isLoggedIn);
		return <View style={styles['container']}>
			<Layout />
		</View>;
	}
}

const styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "white"
	},
	container: {
		flex: 1
	},
	screenOverlay: {
		flex: 1,
		height: '100%',
		width: '100%',
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: 'rgba(255, 255, 255, 0.7)',
		position: 'absolute'
	}
});
