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

import SelectionButton from '../components/SelectionButton';

import { store } from '../lib/reduxStore.js';

export default class FilterOptions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: store.getState().filterOptions,
      // These are currently hardcoded for rapid development. This could easily be 
      // replaced with the complete list of activities from an api call.
      activities: ['baseball', 'soccer', 'weight-training', 'basketball', 'football',
      'mountain-biking', 'running'],
      timeRange: null,
      // These are the ones that the user actually wants to see.
      selectedActivities: []

    }

    // Bind functions
    this.back = this.back.bind(this);
    this.buttonPress = this.buttonPress.bind(this);
    this.renderActivityBoxes = this.renderActivityBoxes.bind(this);
  }

  back() {
    this.props.navigator.pop();
  }

  buttonPress() {

  }

  renderActivityBoxes() {
    console.log('The current filter state is:', this.state.selectedActivities);

    var code = [];
    this.state.activities.map((act) => {
      var partial = (
        <SelectionButton ownerActivities={this.state.selectedActivities} activity={act} />
      )
      code.push(partial)
    })
    return code;
  }

  render() {
    var that = this;


    return (
        <View style={{flex: 1, backgroundColor: '#eee'}}>
          <View style={styles.container}>
            {this.renderActivityBoxes()}
          </View>
          <View style={styles.container2}>
            <Button
              title='Save'
              onPress={function() {}} />
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    margin: 5,
    backgroundColor: '#fff',
    padding: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 3,
    shadowOpacity: 0.4,
    borderRadius: 5,
    justifyContent: 'center',
  },
  container2: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    padding: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 3,
    shadowOpacity: 0.4,
    borderRadius: 5,
    justifyContent: 'center',
  }
})