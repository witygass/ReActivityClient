import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import {Location, Permissions} from 'exponent';
import MapView from 'react-native-maps';

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
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    }
    this.onRegionChange = function(region) {
      console.log(region);
      this.setState({ region });
    }.bind(this)
    getLocationAsync().then(function(res) {
      console.log('something');
      console.log(res);
    })
  }

  static route = {
    navigationBar: {
      visible: false,
      title: 'Map',
    },
  }

  render() {
    return (
      <MapView
        style={{flex: 1}}
        region={this.state.region}
        onRegionChange={this.onRegionChange}
        >
        <MapView.Marker coordinate={this.state.region}/>
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
