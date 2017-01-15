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
  }

  render() {
    var that = this;
    return (
        <View style={styles.filterBar}>
          <TouchableOpacity style={styles.filterOption}
            onPress={
                function() {
                  store.dispatch({
                    type: 'UPDATE_CURRENTLY_VIEWING',
                    viewing: 'myEvents'
                  })
                  that.props.action();
                }
              }
          >
            <Text style={styles.filterOptionText}>Mine</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterOption}
            onPress={
                function() {
                  store.dispatch({
                    type: 'UPDATE_CURRENTLY_VIEWING',
                    viewing: 'friendsEvents'
                  })
                  that.props.action();
                }
              }
          >
            <Text style={styles.filterOptionText}>Friends</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterOption}
            onPress={
                function() {
                  store.dispatch({
                    type: 'UPDATE_CURRENTLY_VIEWING',
                    viewing: 'nearbyEvents'
                  })
                  that.props.action();
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
  filterOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: width * .33332,
    backgroundColor: 'peachpuff',
    borderStyle: 'solid',
    borderColor: 'white',
    borderWidth: 1,
    // borderRadius: 5,
  },
  filterOptionText: {
    color: 'darkslategray',
    textAlign: 'center',
    fontSize: 17,
    fontFamily: 'rubik'
  }
});
