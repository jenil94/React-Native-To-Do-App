import React, { Component } from "react";
import { View, Animated, Text, PanResponder, Dimensions } from "react-native";
import TaskCard from "./TaskCard";
import Icon from "react-native-vector-icons/MaterialIcons";

class SwipableCard extends Component {
  constructor(props) {
    super(props);
    const { height, width } = Dimensions.get("window");
    this.width = width;

    this.gestureDelay = -35;
    this.scrollViewEnabled = true;

    const startPosition = new Animated.ValueXY();
    this.position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderTerminationRequest: (evt, gestureState) => false,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx > 35) {
          this.setScrollViewEnabled(false);
          let newX = gestureState.dx + this.gestureDelay;
          this.position.setValue({ x: newX, y: 0 });
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx < 150) {
          let duration = (this.width - gestureState.dx) * 3;
          Animated.timing(this.position, {
            toValue: { x: 0, y: 0 },
            duration: duration
          }).start(() => {
            this.setScrollViewEnabled(true);
          });
        } else {
          let duration = (this.width - gestureState.dx) * 3;
          Animated.timing(this.position, {
            toValue: { x: this.width, y: 0 },
            duration: duration
          }).start(() => {
            this.props.success(this.props.item.item);
            this.setScrollViewEnabled(true);
          });
        }
      }
    });
    this.panResponder = panResponder;
    this.state = { startPosition };
  }

  componentWillReceiveProps(nextProps){
    Animated.timing(this.position, {
      toValue: { x: 0, y: 0 },
      duration: 500
    }).start(() => {
      this.position.setValue({x: 0, y: 0});
    });
  }

  setScrollViewEnabled(enabled) {
    if (this.scrollViewEnabled !== enabled) {
      this.props.setScrollEnabled(enabled);
      this.scrollViewEnabled = enabled;
    }
  }

  getLeftSide = item => {
    if (item.completed) {
      return (
        <View style={styles["leftContainer"]}>
          <Icon name="schedule" size={20} color="rgba(255,255,255,1)" />
          <Text style={styles.textStyle}>PENDING</Text>
        </View>
      );
    } else {
      return (
        <View style={styles["leftContainer"]}>
          <Icon name="done" size={20} color="rgba(255,255,255,1)" />
          <Text style={styles.textStyle}>DONE</Text>
        </View>
      );
    }
  };

  render() {
    let item = this.props.item && this.props.item.item;
    let leftSide = this.getLeftSide(item);
    const backgroundColor = item.completed ? "#ffb258" : "#50d2c2";
    return (
      <View style={[styles.listItem, { backgroundColor: backgroundColor }]}>
        <Animated.View
          style={[this.position.getLayout()]}
          {...this.panResponder.panHandlers}
        >
          <View style={[styles.absoluteCell]}>{leftSide}</View>
          <View style={styles.innerCell}>
            <TaskCard
              completed={item.completed}
              location={item.location}
              startTime={item.startTime}
              endTime={item.endTime}
              date={item.date}
              title={item.title}
              desc={item.desc}
              id={item.id}
            />
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = {
  listItem: {
    justifyContent: "center",
    marginLeft: -130,
    backgroundColor: "#50d2c2"
  },
  leftContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  absoluteCell: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  innerCell: {
    marginLeft: 130,
    justifyContent: "center",
    alignItems: "center"
  },
  textStyle: {
    color: "white",
    fontSize: 16,
    marginRight: 10,
    paddingLeft: 10
  }
};

export default SwipableCard;
