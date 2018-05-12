/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Home from "./components/Home";
import Screens from "./Screens";
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
  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged(user => {
      setUser(user);
    });
  }

  componentWillUnmount() {
    this.authSubscription();
  }

  render() {
    return <Screens />;
  }
}

const styles = StyleSheet.create({});
