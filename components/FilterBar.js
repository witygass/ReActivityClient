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
  Button,
  Switch
} from 'react-native';

import { store } from '../lib/reduxStore';
import { api } from '../lib/ajaxCalls';

export default class FilterBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toggled: false,
      options: store.getState().filterOptions
    }

    // Bind functions
    this.back = this.back.bind(this);
    this.buttonPress = this.buttonPress.bind(this);
    this.manageToggle = this.manageToggle.bind(this);
  }

  back() {
    this.props.navigator.pop();
  }

  buttonPress() {

  }

  manageToggle() {
    this.setState({toggled: !this.state.toggled});
    // Here we need to call our api to get the filtered event list. First,
    // we construct the options object.
    var options = {};
    var eventList = store.getState().currentlyViewing;

    options.date = false;
    options.sports = store.getState().selectedActivities;

    // This must be called for each list. (Should eventually be built into the api
    // itself.) But, you know, no time.
    api.filterEvents('myEvents', options, function(list) {
      store.dispatch({
        type: 'UPDATE_MY_EVENT_TABLE',
        events: list
      });
    })

    api.filterEvents('friendsEvents', options, function(list) {
      store.dispatch({
        type: 'UPDATE_FRIENDS_EVENT_TABLE',
        events: list
      })
    })

    api.filterEvents('nearbyEvents', options, function(list) {
      store.dispatch({
        type: 'UPDATE_NEARBY_EVENT_TABLE',
        events: list
      })
      console.log('Updated nearby events. (And probably the rest.)')
    })
    
    

  }

  render() {
    var that = this;

    return (
      <View style={styles.container} onPress={this.clicked}>
        <Button 
          onPress={
            () => { console.log('button was pressed. how nice!'); }
          }
          title="Options"
          color="white"
          style={styles.options}
        />
        <Text style={styles.text}>
          
        </Text>
        <Switch
          onValueChange={this.manageToggle}
          style={styles.switch}
          value={this.state.toggled} />
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'gray'
  },
  switch: {
    flex: 1,
  },
  options: {
    flex: 1,
  },
  text: {
    flex: 3,
    fontSize: 20,
    alignSelf: 'center'
  }
})