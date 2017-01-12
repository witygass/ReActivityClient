import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  ExponentLinksView,
} from '@exponent/samples';

import { api } from '../lib/ajaxCalls.js'
import {store} from '../lib/reduxStore'

import FriendListEntry from '../components/FriendListEntry';

export default class FriendsScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Friends',
    },
  }

  constructor() {
    super();
    this.state = {
      friendList: []
    };
  }

  componentWillMount() {
    var that = this;
    api.getFriendListByTokenId(function(friendList) {
      // console.log('API was called, got ', friendList);
      store.dispatch({
        type: 'UPDATE_USER_FRIEND_LIST',
        friendList: friendList
      });
      that.setState({friendList: friendList});
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View>
            <ScrollView style={styles.scrollView}>
              {this.state.friendList.map((friend) => <FriendListEntry friend={friend} key={friend.id}/>)}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  contentContainer: {
    paddingTop: 20,
    width: width,
  }
});
