import React from 'react';
import {
  Image,
  Button,
  Text,
  TextInput,
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Dimensions
} from 'react-native';
import { store } from '../lib/reduxStore.js';

export default class EventViewScreen extends React.Component {

  constructor(props) {
    super(props);
    
    // this.renderAttendees = this.renderAttendees.bind(this);
  }




  render() {
    var that = this;
    return (

      <View style={styles.mainContainer}>
        <Image
          style={styles.backgroundImage}
          source={{uri: 'http://cdn.wonderfulengineering.com/wp-content/uploads/2014/07/phone-5-wallpapers-0003-610x1082.jpg'}}
        >
          <View style={styles.searchContainer}>
            <Text style={styles.text}>
              Look For Events
            </Text>
          </View>
          <View style={styles.eventContainer}>
            <Text style={styles.text}>
              My Events
            </Text>
          </View>
          <View style={styles.mapContainer}>
            <Text style={styles.text}>
              Map View
            </Text>
          </View>
          <View style={styles.profileContainer}>
            <Text style={styles.text}>
              My Profile
            </Text>
          </View>
        </Image>
      </View>
    
    )
  }

}

var shadowStyle = {
  ios: {
    shadowColor: 'black',
    shadowOffset: {height: -3},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  android: {
    elevation: 20,
  },
}

const styles = StyleSheet.create({
    
  mainContainer: {
    flex: 1,
    ...Platform.select(shadowStyle),
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchContainer: {
    flex: 1,
    backgroundColor: '#2D7DD2f4',
    ...Platform.select(shadowStyle),
  },
  eventContainer: {
    flex: 1,
    backgroundColor: '#97CC04f4',
    ...Platform.select(shadowStyle),
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#EEB902f4',
    ...Platform.select(shadowStyle),
  },
  profileContainer: {
    flex: 1,
    backgroundColor: '#F45D01f4',
    ...Platform.select(shadowStyle),
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,

  },
  text: {
    fontSize: 30,
    textAlign: 'center'
  }

})

