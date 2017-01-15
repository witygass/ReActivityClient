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
    api.getFriendListByTokenId(store.getState().userProfileInformation.username, function(friendList) {
      store.dispatch({
        type: 'UPDATE_USER_FRIEND_LIST',
        friendList: friendList
      });
      that.setState({friendList: friendList});
    });
  }

  // NOTE TO SELF:
  //
  // Clicking on a friend won't display anythign because the retrieved object is just basic info. 
  // You need to use it to get a more full profile object.

  render() {
    var that = this;
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View>
            <ScrollView style={styles.scrollView}>
              {this.state.friendList.map((friend) => <FriendListEntry friend={friend} key={friend.id} navigator={that.props.navigator}/>)}
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
  },
  contentContainer: {
    width: width,
  }
});
