import React from 'react';

import {
  Dimensions,
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from 'react-native';

import { store } from '../lib/reduxStore.js'


export default class SelectionButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Whether it is selected determines whether we add or remove from the parent
      // array on click
      selected: false,
      // The activity associated with this particular button
      activity: this.props.activity
    }

    // Bind functions
    this.back = this.back.bind(this);
    this.buttonPress = this.buttonPress.bind(this);
  }

  back() {
    this.props.navigator.pop();
  }

  buttonPress() {
    console.log('One is being pressed!');

    if (!this.state.selected) {
      this.setState({selected: true});
      // Add to redux store.
      var activities = store.getState().selectedActivities;
      activities.push(this.state.activity);
      store.dispatch({
        type: 'SET_SELECTED_ACTIVITIES',
        selectedActivities: activities
      });
    } else {
      this.setState({selected: false});
      // Remove from parent array.
      var copy = store.getState().selectedActivities;
      var newArr = [];
      for (var i = 0; i < copy.length; i++) {
        if (copy[i] !== this.state.activity) newArr.push(copy[i]);
      }
      store.dispatch({
        type: 'SET_SELECTED_ACTIVITIES',
        selectedActivities: newArr
      })
    }
  }

  render() {
    var that = this;

    // Set our style
    if (this.state.selected) {
      _style = { backgroundColor: 'coral' }
    } else {
      _style = { backgroundColor: 'white' }
    }

    return (
      <TouchableOpacity 
        style={[_style, styles.container]}
        onPress={this.buttonPress}
      >
        <Text style={styles.text}>{this.state.activity}</Text>
      </TouchableOpacity>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    fontSize: 25,
    paddingLeft: 30,
    paddingTop: 10
  }
})