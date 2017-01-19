import React from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';

import { store } from '../lib/reduxStore.js';

export default class EventTypeFilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentlySelected: 'Mine'
    }
  }

  render() {
    var that = this;
    var mineColor = this.state.currentlySelected === 'Mine' ? 'peachpuff' : 'seashell';
    var friendsColor = this.state.currentlySelected === 'Friends' ? 'peachpuff' : 'seashell';
    var nearbyColor = this.state.currentlySelected === 'Nearby' ? 'peachpuff' : 'seashell';

    return (
        <View style={styles.filterBar}>
          <TouchableOpacity style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: width * .33332,
            backgroundColor: mineColor,
            borderStyle: 'solid',
            borderColor: 'white',
            borderWidth: 1,
          }}
            onPress={
                function() {
                  store.dispatch({
                    type: 'UPDATE_CURRENTLY_VIEWING',
                    viewing: 'myEvents'
                  })
                  that.props.action();
                  that.setState({currentlySelected: 'Mine'});
                }
              }

          >
            <Text style={styles.filterOptionText}>Mine</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: width * .33332,
            backgroundColor: friendsColor,
            borderStyle: 'solid',
            borderColor: 'white',
            borderWidth: 1,
          }}
            onPress={
                function() {
                  store.dispatch({
                    type: 'UPDATE_CURRENTLY_VIEWING',
                    viewing: 'friendsEvents'
                  })
                  that.props.action();
                  that.setState({currentlySelected: 'Friends'})
                }
              }
          >
            <Text style={styles.filterOptionText}>Friends</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: width * .33332,
            backgroundColor: nearbyColor,
            borderStyle: 'solid',
            borderColor: 'white',
            borderWidth: 1,
          }}
            onPress={
                function() {
                  store.dispatch({
                    type: 'UPDATE_CURRENTLY_VIEWING',
                    viewing: 'nearbyEvents'
                  })
                  that.props.action();
                  that.setState({currentlySelected: 'Nearby'})
                }
              }
          >
            <Text style={styles.filterOptionText}>Nearby</Text>
          </TouchableOpacity>
      </View>
    );
  }
}

var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  filterBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {height: -3},
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
  },
  /* THIS IS NOW INLINE TO SUPPORT SELECTED COLOR - WOULD LIKE TO FIX THIS IN FUTURE */
  // filterOption: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   width: width * .33332,
  //   backgroundColor: 'peachpuff',
  //   borderStyle: 'solid',
  //   borderColor: 'white',
  //   borderWidth: 1,
  // },
  filterOptionText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 17,
    fontFamily: 'rubik'
  }
});
