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

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
	"Double tap R on your keyboard to reload,\n" +
	"Shake or press menu button for dev menu"
});

type Props = {};
export default class App extends Component<Props> {
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
	return <Layout />;
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
	flex: 1,
	alignItems: "center",
	justifyContent: "center",
	backgroundColor: "white"
  }
});
