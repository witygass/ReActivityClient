import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import {
  ExponentLinksView,
} from '@exponent/samples';

import { api } from '../lib/ajaxCalls.js'
import {store} from '../lib/reduxStore'

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
    console.log('Component will mount is running.')
    api.getFriendListByTokenId(function(friendList) {
      console.log('API was called, got ', friendList);
      store.dispatch({
        type: 'UPDATE_USER_FRIEND_LIST',
        friendList: friendList
      });
      that.setState({friendList: friendList});
    });
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>
        <Text>This is where the friends screen will live</Text>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
});
