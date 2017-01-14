import React from 'react';
import {
  Dimensions,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { withNavigation } from '@exponent/ex-navigation';
import Router from '../navigation/Router';
import { store } from '../lib/reduxStore';

@withNavigation
export default class EventMarkerCallout extends React.Component {
  constructor(props) {
    super(props);
    this.setCurrentEventView = this.setCurrentEventView.bind(this);
  }

  setCurrentEventView() {
    var event = this.props.event;
    store.dispatch({
      type: 'UPDATE_CURRENTLY_VIEWING_EVENT',
      event: event
    });
    // console.log('The event being pushed is:', event);
    this.props.navigator.push('eventView');
  }

  render() {
    return (
      <TouchableOpacity onPress={this.setCurrentEventView} style={styles.container}>
        <View style={{width: width * .75}}>
          <Text
            style={{fontWeight: '700'}}
            numberOfLines={1}
          >
            {this.props.event.title}
          </Text>
        </View>
        <View style={{width: width * .75}}>
          <Text
            numberOfLines={2}
          >
            {this.props.event.description}
          </Text>
        </View>
      </TouchableOpacity>
    ); }
}

var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width * .4,
    backgroundColor: 'white',
    zIndex: 1,
  }
});
