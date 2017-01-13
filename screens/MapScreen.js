import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import * as Exponent from 'exponent';
import MapView from 'react-native-maps';
import { store } from '../lib/reduxStore';

export default class MapScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
      title: 'Map',
    },
  }

  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: store.getState().locationDetails.lat,
        longitude: store.getState().locationDetails.lon,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      events: store.getState().nearbyEvents
    }
  }

  componentDidMount() {
    async function getLocationAsync() {
      const { Location, Permissions } = Exponent;
      const { status } = await Permissions.askAsync(Permissions.LOCATION);

      if (status === 'granted') {
        navigator.geolocation.getCurrentPosition((position) => {
          var initialPosition = position;
          this.setState({initialPosition});
        },
        (error) => alert(JSON.stringify(error))
        );
        this.watchID = navigator.geolocation.watchPosition((position) => {
          var currentPosition = position.coords;
          var locs = [];
          var latDelta = 0;
          var lonDelta = 0;
          // CHANGE THESE WHEN NATE FIXES LATLNG
          var userLat = currentPosition.latitude;
          var userLon = currentPosition.longitude;
          //
          for (let i = 0; i < this.state.events.length; i++) {
            var eventCoords = this.state.events[i].locDetailsView
            if (Math.abs(userLat - eventCoords.latitude) * 3 > latDelta) {
              latDelta = Math.abs(userLat - eventCoords.latitude) * 3
            }
            if (Math.abs(userLon - eventCoords.longitude) * 3 > lonDelta) {
              lonDelta = Math.abs(userLon - eventCoords.longitude) * 3
            }
          }
          // console.log([userLat, userLon])
          currentPosition.latitudeDelta = latDelta;
          currentPosition.longitudeDelta = lonDelta;
          this.setState({region: currentPosition});
        });
      } else {
        throw new Error('Location permission not granted');
      }
    }
  }

  render() {
    return (
      <MapView
        style={{flex: 1}}
        showsUserLocation={true}
        region={this.state.region}
      >
      {this.state.events.map(eventMarker => (
        <MapView.Marker
          coordinate={{longitude: eventMarker.locDetailsView.longitude, latitude: eventMarker.locDetailsView.latitude}}
          title={eventMarker.title}
          description={eventMarker.description}
          key={eventMarker.id}
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
