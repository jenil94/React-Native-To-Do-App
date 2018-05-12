import React, { Component } from 'react';
import { FlatList } from 'react-native';
import SwipableCard from './SwipableCard';

class SwipableList extends Component {
	constructor(props){
		super(props);
		this.state = {
			enable: true,
			data: props.data
		};
	}

	setScrollEnabled = (enable) => {
		this.setState({
			enable
		});
	};

	componentWillReceiveProps(nextProps){
		this.setState({
			data: nextProps.data,
			enable: true
		})
	}

	shouldComponentUpdate(){
		return true;
	}

	success = (item) => {
		this.props.success(item);
	};

	renderItem = (item) => {
		return (
			<SwipableCard
				item={item}
				success={this.success}
				setScrollEnabled={enable => this.setScrollEnabled(enable)}
			/>
		);
	}

	render() {
		return (
		<FlatList
			style={this.props.style}
			data={this.state.data}
			keyExtractor={(item) => item.id}
			renderItem={(item) => this.renderItem(item)}
			scrollEnabled={this.state.enable}
	 		/>
		);
	}
}

export default SwipableList;