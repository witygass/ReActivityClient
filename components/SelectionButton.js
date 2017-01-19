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
      activity: this.props.activity,
      // This refresh value exists only so that it can be changed with setState(). This
      // causes the page to re-render, effectively refreshing it. It's actual value doesn't
      // matter -- only that it changed.
      refresh: true
    }

    // Bind functions
    this.back = this.back.bind(this);
    this.buttonPress = this.buttonPress.bind(this);
    this.r = this.r.bind(this);
  }

  r() {
    // This is a refresh function. It is meant to be short, since it might be called 
    // frequently.
    this.setState({refresh: !this.state.refresh});
  }

  back() {
    this.props.navigator.pop();
  }

  buttonPress() {

    console.log('Weve pressed the button.')

    // Check if filterButtonSelected has a value on it. If not, the button is being pressed
    // for the first time. In this case, set selected to 'true'.
    if (store.getState().filterButtonSelected[this.state.activity] === undefined) {
      console.log('THIS SHOULD BE HAPPENING')
      store.dispatch({
        type: 'SET_FILTER_BUTTON',
        eventName: this.state.activity,
        newValue: false
      })
      this.r();

    }
    // if the value is false, set it to true.
    if (store.getState().filterButtonSelected[this.state.activity] === false) {
      store.dispatch({
        type: 'SET_FILTER_BUTTON', 
        eventName: this.state.activity,
        newValue: true
      })
      this.r();
    }

    // If the value is true, set it to false.
    else if (store.getState().filterButtonSelected[this.state.activity] === true) {
      store.dispatch({
        type: 'SET_FILTER_BUTTON',
        eventName: this.state.activity,
        newValue: false
      })
      this.r();
    }


    // If the value is true, then push it to the filter.
    if (store.getState().filterButtonSelected[this.state.activity] === true) {
      // Add to redux store.
      var activities = store.getState().selectedActivities;
      activities.push(this.state.activity);
      store.dispatch({
        type: 'SET_SELECTED_ACTIVITIES',
        selectedActivities: activities
      });
    }

    // If the value is false, remove it from the filter. 
    if (store.getState().filterButtonSelected[this.state.activity] === false) {
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

    console.log('Selected is:', store.getState().filterButtonSelected[this.state.activity]);

    // Set our style
    if (store.getState().filterButtonSelected[this.state.activity]) {
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