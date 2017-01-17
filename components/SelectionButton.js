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


export default class SelectionButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // We need to maintain reference to the array of activities of the parents,
      // since we're going to be appending or removing activities from/to it.
      ownerActivities: this.props.ownerActivities,
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
      // Add to parents array. User wants to see this.
      this.state.ownerActivities.push(this.state.activity);
    } else {
      this.setState({selected: false});
      // Remove from parent array.
      var copy = this.state.ownerActivities.slice();
      var newArr = [];
      for (var i = 0; i < copy.length; i++) {
        if (copy[i] !== this.state.activity) newArr.push(copy[i]);
      }
      this.setState({ownerActivities: newArr});
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