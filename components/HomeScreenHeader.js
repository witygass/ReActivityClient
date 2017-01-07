import React from 'react';
import {
  Button,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import Router from '../navigation/Router';
import { withNavigation } from '@exponent/ex-navigation';

@withNavigation
export default class HomeScreenHeader extends React.Component {
  constructor(props) {
    super(props);
    this.navigateToAddEvent = this.navigateToAddEvent.bind(this);
  }

  navigateToAddEvent() {
    this.props.navigator.push(Router.getRoute('createEvent'));
  }

  render() {
    return (
      <View style={styles.filterBar}>
        <View style={styles.filterOption}>
          <Text style={styles.filterOptionText}>Activities</Text>
        </View>
        <Button
          onPress={this.navigateToAddEvent}
          title="⊕"
          color="midnightblue"
          accessibilityLabel="Add Event"
          />
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
    // borderStyle: 'solid',
    // borderTopColor: 'silver',
    // borderWidth: 1,
  },
  filterOptionText: {
    marginLeft: width * .07,
    textAlign: 'center',
    fontSize: 17,
    color: 'midnightblue',
  }
});
