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
  Button,
  Switch
} from 'react-native';

import { store } from '../lib/reduxStore.js';
import { api } from '../lib/ajaxCalls.js';

export default class FriendStatus extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: this.props.status,
      friendId: this.props.friendId
    }

  }

  


  render() {
    var that = this;

    if (this.state.status === 'inboundFriendReqToAcceptOrDelete') {
      return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.accept}>
            <Text>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.reject}>
            <Text>Reject</Text>
          </TouchableOpacity>
        </View>
      )
    } else if (this.state.status === 'friend') {
      return (
        <View>
          <Text>Friends</Text>
        </View>
      )
    } else if (this.state.status === 'outboundFriendReqPending') {
      return (
        <View>
          <Text>Pending Request...</Text>
        </View>
      )
    } else if (this.state.status === null) {
      return (
        <View>
          <TouchableOpacity>
            <Text>Send Friend Request</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <Text>{this.state.status}</Text>
      )
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderColor: '#eee',
    height: 40
  },
  accept: {
    flex: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgreen',
    height: 34,
    borderRadius: 5,
    marginLeft: 6,
    marginRight: 3

  },
  reject: {
    flex: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff7777',
    height: 34,
    borderRadius: 5,
    marginLeft: 3,
    marginRight: 6
  }
})