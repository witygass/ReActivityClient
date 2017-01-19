import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as Exponent from 'exponent';
import MapView from 'react-native-maps';
import EventMarkerCallout from '../components/EventMarkerCallout';
import { store } from '../lib/reduxStore';
import { FontAwesome } from '@exponent/vector-icons';
import { loader } from '../lib/loader';
var {height, width} = Dimensions.get('window');

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
    // this.onRegionChange = this.onRegionChange.bind(this);
  }

  componentDidMount() {
    console.log(this.state.events);
    var mapView = this;
    async function getLocationAsync() {
      const { Location, Permissions } = Exponent;
      const { status }  = await Permissions.askAsync(Permissions.LOCATION);

      console.log('STATUS IS:', status)

      if (status === 'granted') {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log('location permission is granted.');
          var initialPosition = position;
          mapView.setState({initialPosition});
        },
        (error) => alert(JSON.stringify(error))
        );
        mapView.watchID = navigator.geolocation.watchPosition((position) => {
          var currentPosition = position.coords;
          var latMin, latMax, lonMin, lonMax;
          mapView.state.events.forEach((event) => {
            if (latMin === undefined || event.locDetailsView.latitude < latMin) { latMin = event.locDetailsView.latitude }
            if (lonMin === undefined || event.locDetailsView.longitude < lonMin) { lonMin = event.locDetailsView.longitude }
            if (latMax === undefined || event.locDetailsView.latitude > latMax) { latMax = event.locDetailsView.latitude }
            if (lonMax === undefined || event.locDetailsView.longitude > lonMax) { lonMax = event.locDetailsView.longitude }
          });
          currentPosition.latitudeDelta = (latMax - latMin); // latDelta;
          currentPosition.longitudeDelta = (lonMax - lonMin); // lonDelta;
          console.log(currentPosition.latitudeDelta, currentPosition.longitudeDelta);
          mapView.setState({region: currentPosition});
        });
      } else {
        throw new Error('Location permission not granted');
      }
    };
    getLocationAsync();
  }

  // onRegionChange(region) {
  //   var map = this;
  //   map.setState({region});
  //   loader.loadNearbyEvents(function(events) {
  //     map.setState({events: events});
  //   }, region.latitude, region.longitude);
  // }
  // ADD THIS TO THE MAPVIEW
  ///////////////////////////////////////
  // onRegionChange={this.onRegionChange}
  ///////////////////////////////////////

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
          key={eventMarker.title}
        >
          <MapView.Callout
            style={{width: width * .75}}
            tooltip={false}
          >
            <EventMarkerCallout
              event={eventMarker}
            />
          </MapView.Callout>
        </MapView.Marker>
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
