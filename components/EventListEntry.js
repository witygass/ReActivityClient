// This component is used when a list of events needs to be displayed. Each individual event
// in the list is rendered with this component, meaning that there will be many copies of this
// component on the screen at a time. As such, keep it light.

import React from 'react';
import {
  Dimensions,
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Components } from 'exponent';
import { withNavigation } from '@exponent/ex-navigation';
import { store } from '../lib/reduxStore';
import Router from '../navigation/Router';

export default class EventListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.setCurrentEventView = this.setCurrentEventView.bind(this);
  }

  // In the case that someone clicks on an event, we need to change out 'currently viewed event'
  // to said event, then add the 'view event' screen to the navigation stack.
  setCurrentEventView() {
    var event = this.props.event;
    store.dispatch({
      type: 'UPDATE_CURRENTLY_VIEWING_EVENT',
      event: event
    });
    console.log('The event being pushed is:', event);
    this.props.navigator.push('eventView');
  }

  render() {
  return (
    <TouchableOpacity onPress={this.setCurrentEventView}>
      <View style={styles.container}>
        <View style={styles.creator}>
          <Image
            style={styles.creatorPhoto}
            source={{uri: this.props.event.creator.profileUrl || 'http://lorempixel.com/400/400/'}}
          >
          <Components.LinearGradient
            colors={['transparent', 'rgba(0,0,0,1)']}
            style={styles.creatorNameGradient}
          >
            <Text style={styles.creatorName}>{this.props.event.creator.firstName}</Text>
          </Components.LinearGradient>
          </Image>
        </View >
        <View style={styles.details}>
          <Text
            style={styles.title}
            numberOfLines={1}
          >{this.props.event.title}
          </Text>
          <Text
            style={styles.description}
            numberOfLines={3}
          >Place: {this.props.event.description}</Text>
        </View>
    </View>
  </TouchableOpacity>
  );}
}

var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: '#fbfbfb',
    // marginVertical: 5,
    height: 95,
    marginBottom: 3,
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
  creator: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: width * .22,
  },
  creatorPhoto: {
    width: width * .22,
    height: width * .22,
  },
  creatorNameGradient: {
    position: 'absolute',
    bottom: 0,
    width: width * .22,
    alignItems: 'center'
  },
  creatorName: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '300',
    color: 'azure',
    backgroundColor: 'transparent',
    fontFamily: 'rubik'
  },
  details: {
    overflow: 'hidden',
    paddingTop: 6,
    paddingHorizontal: width * .02,
    width: width * .76,
    marginBottom: 8,
  },
  title: {
    fontSize: 17,
    fontFamily: 'rubik'
  },
  description: {
    color: 'darkslategray',
    marginTop: 5,
    marginRight: 5,
    fontSize: 13,
    fontWeight: '100',
    fontFamily: 'rubik'
  },
});
