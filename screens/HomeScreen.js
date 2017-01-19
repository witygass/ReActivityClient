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
import FilterBar from '../components/FilterBar';

import { MonoText } from '../components/StyledText';
import { api } from '../lib/ajaxCalls'
import { store } from '../lib/reduxStore'
import { loader } from '../lib/loader';

export default class HomeScreen extends React.Component {

  static route = {
    navigationBar: {
      visible: false
    }
  }

  constructor() {
    super();
    this.state = {
      // It is unclear what these three properties are used for. Consider removal.
      refreshing: false,
      loaded: 0,
      rowData: Array.from(new Array(20)).map((val, i) => ({text: 'Initial row ' + i, clicks: 0})),

      // Four arrays which store a collection of all events in that list. Watched events
      // is not currently being used. Remove if never used.
      nearbyEvents: store.getState().nearbyEvents,
      friendsEvents: store.getState().friendsEvents,
      watchedEvents: store.getState().watchedEvents,
      myEvents: store.getState().myEvents,

      // This keeps reference to the list currently being used. It will be a string, so that it can be
      // passed back through this.state to reach the desired event array. Ie, 'nearbyEvents', 'friendsEvents',
      // 'watchedEvents', or 'myEvents'.
      currentlyViewing: store.getState().currentlyViewing,
      tokenRender: null,
      // This is a special value used to do hackey refresh things from the filterBar
      refresh: true
    };

    // Function binding.
    this._onRefresh = this._onRefresh.bind(this);
    this.hotRefresh = this.hotRefresh.bind(this);
    this.checkAndLoad = this.checkAndLoad.bind(this);

    // Subscribe to the redux store, for huge re-rendering
    store.subscribe(function() {
      this.setState({
        myEvents: store.getState().myEvents,
        nearbyEvents: store.getState().nearbyEvents,
        friendsEvents: store.getState().friendsEvents
      })






      console.log('the home page subscription just went off!');
    }.bind(this));
  }

  loadContent() {
    var that = this;

    console.log('Load content is running. This shouldnt matter')

    loader.loadNearbyEvents(function(events) {
      that.setState({nearbyEvents: events});
    });

    loader.loadMyEvents(function(events) {
      that.setState({myEvents: events});
    });

    loader.loadFriendsEvents(function(events) {
      that.setState({friendsEvents: events});
    })

    api.getSports(function(sports) {
      store.dispatch({
        type: 'SET_SPORT_IDS', 
        sportIds: sports
      });
    })
  }

  // This is called when the user pulls down the page when they are already at the top.
  // (Scroll refresh.)
  _onRefresh() {
    this.checkAndLoad();
  }

  // This occurs when the user pushes a button on the top navigator tab. It changes the
  // currently viewed list.
  hotRefresh() {
    this.setState({currentlyViewing: store.getState().currentlyViewing});
  }

  // We need to check the Signin status to access protected requests and get user info
  checkAndLoad() {
    var that = this;
    if (!store.getState().userProfileInformation.token) {
      AsyncStorage.multiGet(['JWTtoken', 'userId', 'username']).then((array) => {
        store.dispatch({
          type: 'UPDATE_USER_INFO',
          token: array[0][1],
          userId: array[1][1],
          username: array[2][1]
        });
        if (array[0][1])  {
          that.setState({tokenRender: true});
          that.loadContent();
        } else {
          that.props.navigator.push('signin');
        }
      })
      .catch((err) => {
        console.log('Set AsyncStorage Error:', err);
      });
    } else {
      that.setState({tokenRender: true});
      that.loadContent();
    }

  }

  // We'll attempt to load our data when the component mounts. Note that there will be a brief moment
  // where the page is rendering and data is not present. Correctly reference objects to ensure that
  // you aren't attempting to access a property on an undefined value (left by the lack of data.)
  componentWillMount() {
    this.checkAndLoad();
  }


  render() {
    var that = this;
    console.log('We are rendering again. Nearby Events are:', this.state.nearbyEvents);
    // console.log('that.state.myEvents is: ', that.state.myEvents);
    var toRender = that.state[that.state.currentlyViewing];
    if(this.state.tokenRender) {
      return (
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <View style={styles.header}>
              <HomeScreenHeader />
            </View>
            <View style={{height: 40}}>
              <EventTypeFilterBar action = {this.hotRefresh}/>
            </View>
            <View style={{height: 38}}>
              <FilterBar parent={this} navigator={this.props.navigator}/>
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
    } else {
      return (
      <View>
      </View>
      )
    }
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
    width: width,
  },
  header: {
    flex: 0,
    height: 40,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'coral',
    paddingBottom: 2,
  },
  filterBarContainer: {
    height: 40,
    marginBottom: 2,
  },
  scrollView: {
    borderTopWidth: 1,
    borderTopColor: 'gainsboro',
    minHeight: height * .1,
  }
});
