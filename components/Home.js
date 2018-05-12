import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import Header from "./Header";
import listData from "../data/taskList.json";
import TaskCard from "./TaskCard";
import TabView from "./TabView";
import FabButton from "./FabButton";
import firebase from "react-native-firebase";
import Icon from "react-native-vector-icons/MaterialIcons";
import { getFireStoreToDORef, setUser } from "../FirebaseUtil";
import SwipableList from "./SwipableList";

class Home extends Component {
  state = {
    contentLoaded: false
  };

  toggleToDo = item => {
    let itemRef = this.fireRef.doc(item.id);
    itemRef.update({
      completed: !item.completed
    });
  };

  getSecondListItem = () => {
    if (!this.state.contentLoaded) {
      return (
        <View style={styles["contentLoading"]}>
          <ActivityIndicator size={40} color="#50d2c2" />
        </View>
      );
    }

    if (
      this.state.toDoData &&
      Array.isArray(this.state.toDoData) &&
      this.state.toDoData.length
    ) {
      return (
        <SwipableList
          success={item => this.toggleToDo(item)}
          data={this.state.toDoData}
        />
      );
    } else {
      return (
        <View style={styles["contentLoading"]}>
          <Icon name="done-all" size={100} color="#50d2c2" />
          <Text style={styles["doneText"]}>Yooo! Done for the day</Text>
        </View>
      );
    }
  };

  getStatusBlock = () => {
    return (
      <View style={styles["statusBlock"]}>
        <View style={styles["inProgress"]}>
          <Text>In Progress</Text>
        </View>
        <View style={styles["done"]}>
          <Text>Done</Text>
        </View>
      </View>
    );
  };

  getTitleBlock = () => {
    return (
      <View style={styles["container"]}>
        <View style={styles["statusBar"]} />
        <View style={styles["textBlock"]}>
          <Text style={styles["text"]}>{"Tuesday, March 9".toUpperCase()}</Text>
        </View>
      </View>
    );
  };

  componentDidMount() {
	this.currentDay = new Date().getTime();
	this.fireRef = getFireStoreToDORef();

	this.dataSubscription = this.fireRef.onSnapshot(() => {
		this.getStructuredDataFromFireStore(this.currentDay);
	});

	this.getStructuredDataFromFireStore(this.currentDay);
  }

  getStructuredDataFromFireStore = timestamp => {
    let today = timestamp ? new Date(timestamp) : new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);

    this.getDataFromFireStore(today.getTime()).then(toDoData => {
      const completed = [],
        inProgress = [];
      toDoData.map(data => {
        data.completed ? completed.push(data) : inProgress.push(data);
      });
      this.setState({
        toDoData: inProgress.concat(completed),
        contentLoaded: true
      });
    });
  };

  getDataFromFireStore = timestamp => {
    if (this.fireRef) {
      return this.fireRef
        .where("date", "==", timestamp)
        .get()
        .then(querySnapshot => {
          const finalTodo = [];
          querySnapshot.forEach(doc => {
            let data = doc.data();
            data.id = doc.id;
            finalTodo.push(data);
          });
          return Promise.resolve(finalTodo);
          // return(querySnapshot);
        })
        .catch(function(error) {});
    }
  };

  componentWillUnmount() {
    this.dataSubscription();
  }

  getEntireWeekData = () => {
    // data = {
    // 	'timestamp': 'timestamp',
    // 	'day': 'day',
    // 	'date': '',
    // 	'month': '',
    // 	'isToday': true/ false
    // }
    const data = [],
      now = new Date(),
      today = new Date(now.getFullYear(), now.getMonth(), now.getDate()),
      week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    let i = today.getDay();
    // Get All dates before today
    for (let j = 0; j < i; j++) {
      const newDate = new Date(today.getTime() - 24 * 60 * 60 * 1000 * (i - j));
      data.push({
        timestamp: newDate.getTime(),
        day: newDate.getDay(),
        dayName: week[newDate.getDay()],
        date: newDate.getDate(),
        month: newDate.getMonth(),
        isToday: false
      });
    }
    // Push Today
    data.push({
      timestamp: today.getTime(),
      day: today.getDay(),
      dayName: week[today.getDay()],
      date: today.getDate(),
      month: today.getMonth(),
      isToday: true
    });
    // Get All dates after
    for (let j = i + 1; j < 7; j++) {
      const newDate = new Date(today.getTime() + 24 * 60 * 60 * 1000 * (j - i));
      data.push({
        timestamp: newDate.getTime(),
        day: newDate.getDay(),
        dayName: week[newDate.getDay()],
        date: newDate.getDate(),
        month: newDate.getMonth(),
        isToday: false
      });
    }
    return {
      data: data,
      activeIndex: today.getDay()
    };
  };

  onTabChange = data => {
    this.currentDay = data.timestamp;
    this.getStructuredDataFromFireStore(this.currentDay);
    this.setState({
      activeIndex: data.day,
      contentLoaded: false
    });
  };

  signOut = () => {
    firebase.auth().signOut();
  };

  render() {
    const secondListItems = this.getSecondListItem(),
      statusBlock = this.getStatusBlock(),
      titleBlock = this.getTitleBlock(),
      weekData = this.getEntireWeekData();
    activeIndex =
      this.state && Number.isInteger(this.state.activeIndex)
        ? this.state.activeIndex
        : weekData.activeIndex;
    return <View style={{ backgroundColor: "white", flex: 1 }}>
        <Header
          title="Overview"
          rightIcon="exit-to-app"
          rightButtonAction={this.signOut}
        />
        <TabView
          onTabChange={this.onTabChange}
          navigation={this.props.navigation}
          data={weekData.data}
          activeIndex={activeIndex}
        />
        <ScrollView style={{ flex: 1 }}>{secondListItems}</ScrollView>
        <FabButton navigation={this.props.navigation} />
      </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: 60,
    flexDirection: "row",
    backgroundColor: "#f8f8f8"
  },
  statusBar: {
    backgroundColor: "rgba(29,29, 38, .1)",
    width: 7
  },
  textBlock: {
    flex: 7,
    justifyContent: "center",
    marginLeft: 25
  },
  text: {
    fontSize: 14,
    letterSpacing: 1.7
  },
  contentLoading: {
    flex: 1,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  doneText: {
    color: "rgba(0,0,0,0.3)",
    fontSize: 18
  }
});

export default Home;
