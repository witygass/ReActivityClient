import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import {Location, Permissions} from 'exponent';
import MapView from 'react-native-maps';
import dummyEventData from './dummyData/dummyEventData';

import { store } from '../lib/reduxStore.js';

var getLocationAsync = async function() {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status === 'granted') {
    return Location.getCurrentPositionAsync({enableHighAccuracy: true});
  } else {
    throw new Error('Location permission not granted');
  }
}

export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: store.getState().locationDetails.lat,
        longitude: store.getState().locationDetails.lon,
        // latitude: 45,
        // longitude: -70,
        // latitudeDelta: 0.0922,
        // longitudeDelta: 0.0421,
        // latitude: 37.78825,
        // longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      events: dummyEventData
    }
    this.onRegionChange = function(region) {
      console.log('region has changed!');
      this.setState({ region });
    }.bind(this)
    // getLocationAsync().then(function(res) {
    //   console.log('something');
    //   console.log(res);
    // })
  }

  static route = {
    navigationBar: {
      visible: false,
      title: 'Map',
    },
  }

  render() {
    // onRegionChange is triggered when not desired.. not sure why this is happening. Removing for now.
    console.log(this.state.events);
    // onRegionChange={this.onRegionChange}
    return (
      <MapView
        style={{flex: 1}}
        region={this.state.region}
      >
      {this.state.events.map(eventMarker => (
        <MapView.Marker
          coordinate={eventMarker.location.latlng}
          title={eventMarker.title}
          description={eventMarker.description}
          key={eventMarker.key}
        />
      ))}
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
});
