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

import { store } from '../lib/reduxStore';
import { api } from '../lib/ajaxCalls';

export default class FilterOptions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: store.getState().filterOptions,
      // These are currently hardcoded for rapid development. This could easily be 
      // replaced with the complete list of activities from an api call.
      activities: ['baseball', 'soccer', 'weight-training', 'basketball', 'football',
      'mountain-biking', 'running'],
      timeRange: null

      // These are the ones that the user actually wants to see. This may be a point
      // of confusion. The action 'selectionButton' element mutates the input array,
      // which is this. 
      //
      // Any selected activities here are passed to options. (They must first be converted
      // to ids.)
    
    }

    // Bind functions
    this.back = this.back.bind(this);
    this.saveFilterOptions = this.saveFilterOptions.bind(this);
    this.renderActivityBoxes = this.renderActivityBoxes.bind(this);
  }

  back() {
    this.props.navigator.pop();
  }

  saveFilterOptions() {
    // Here we're going to 'cheat'. We need to modify the 'selectedActivities' from a subcomponent.
    // Since you can't use props 'upwards', we're going to save it on state, then grab pack from
    // state before saving. And by 'state', I do mean redux.
    var activities = store.getState().selectedActivities;

    this.props.navigator.pop();

    console.log('Activities is:', activities);

  }

  renderActivityBoxes() {
    console.log('The current filter state is:', store.getState().selectedActivities);

    var code = [];
    this.state.activities.map((act) => {
      var partial = (
        <SelectionButton activity={act} />
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
              onPress={this.saveFilterOptions} />
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