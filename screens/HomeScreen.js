import React from 'react';
import {
  AsyncStorage,
  Button,
  Dimensions,
  Image,
  Linking,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  createRouter,
  NavigationProvider,
  StackNavigation,
} from '@exponent/ex-navigation';
import Router from '../navigation/Router'
import EventListEntry from '../components/EventListEntry';
import EventTypeFilterBar from '../components/EventTypeFilterBar';
import HomeScreenHeader from '../components/HomeScreenHeader';
import dummyEventData from './dummyData/dummyEventData';

import { MonoText } from '../components/StyledText';
import { api } from '../lib/ajaxCalls.js'
import {store} from '../lib/reduxStore'

export default class HomeScreen extends React.Component {

  static route = {
    navigationBar: {
      visible: false
    }
  }

  constructor() {
    super();
    this.state = {
      refreshing: false,
      loaded: 0,
      rowData: Array.from(new Array(20)).map((val, i) => ({text: 'Initial row ' + i, clicks: 0})),
      nearbyEvents: store.getState().nearbyEvents,
      friendsEvents: store.getState().friendsEvents,
      watchedEvents: store.getState().watchedEvents,
      myEvents: store.getState().myEvents,
      currentlyViewing: store.getState().currentlyViewing
    };
    this._onRefresh = this._onRefresh.bind(this);
    this.hotRefresh = this.hotRefresh.bind(this);
  }

  _onRefresh() {
    var that = this;
    api.getNearbyEvents(function(events) {
      store.dispatch({
        type: 'UPDATE_NEARBY_EVENT_TABLE',
        events: events
      });
      that.setState({nearbyEvents: events});
    })

    AsyncStorage.getItem('JWTtoken').then((token) => {
      if (!token) {
        that.props.navigator.push(Router.getRoute('signin'));
      }
    });
  }

  hotRefresh() {
    this.setState({currentlyViewing: store.getState().currentlyViewing});
  }

  componentWillMount() {
    var that = this;
    api.getNearbyEvents(function(events) {
      // console.log('API is being called, this is the internal function.')
      store.dispatch({
        type: 'UPDATE_NEARBY_EVENT_TABLE',
        events: events
      });
      that.setState({nearbyEvents: events});
    });
    AsyncStorage.getItem('JWTtoken').then((token) => {
      if (!token) {
        that.props.navigator.push('signin');
      }
    });
  }


  render() {
    var that = this;
    var toRender = that.state[that.state.currentlyViewing];
    console.log('toRender is:', toRender)
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={{flex: 0, height: 30, flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch', backgroundColor: 'paleturquoise'}}>
            <HomeScreenHeader/>
          </View>
            <View style={{height: 40}}>
              <EventTypeFilterBar action = {this.hotRefresh}/>
            </View>
          <View>
            <ScrollView
              style={styles.scrollView}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh}
                  tintColor="silver"
                  title="Loading..."
                  titleColor="silver"
                />
              }>
              {toRender.map((event) => <EventListEntry event={event} key={event.id} navigator={that.props.navigator}/>)}
            </ScrollView>
          </View>
        </View>
      </View>
    )
  }
}


var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  contentContainer: {
    paddingTop: 24,
    width: width,
  },
  scrollView: {
    minHeight: height,
  },
});
