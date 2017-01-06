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

export default class EventTypeFilterBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <View style={styles.filterBar}>
          <TouchableOpacity style={styles.filterOption}>
            <Text style={styles.filterOptionText}>Mine</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterOption}>
            <Text style={styles.filterOptionText}>Friends</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterOption}>
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
    borderStyle: 'solid',
    borderColor: 'burlywood',
    borderWidth: .5,
  },
  filterOptionText: {
    textAlign: 'center',
    fontSize: 17,
  }
});
