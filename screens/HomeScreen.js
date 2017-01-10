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
import { MonoText } from '../components/StyledText';
import dummyEventData from './dummyData/dummyEventData';
import {api} from '../lib/ajaxCalls'
import {store} from '../lib/reduxStore'

export default class HomeScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  }


  constructor() {
    super()
    this.state = {
      refreshing: false,
      loaded: 0,
      rowData: Array.from(new Array(20)).map(
        (val, i) => ({text: 'Initial row ' + i, clicks: 0})),
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
    api.getNearbyEvents({}, function(events) {
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
    generator();
    var that = this;
    api.getNearbyEvents({}, function(events) {
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
              {


                toRender.map((event) => <EventListEntry event={event} key={event.id}/>)}
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
    // marginTop: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
    // backgroundColor: '#fff',
    // backgroundColor: 'pink',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 15,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 20,
    width: width,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 200,
    height: 34.5,
    marginTop: 3,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 23,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  scrollView: {
    minHeight: height,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
