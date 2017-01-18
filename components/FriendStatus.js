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

    // Bind functions
    this.accept = this.accept.bind(this);
    this.reject = this.reject.bind(this);
    this.send = this.send.bind(this);
  }

  accept() {
    var id = this.state.friendId;
    var that = this;
    api.acceptFriendRequests(id, function() {
      that.setState({status: 'friend'});
    })
  }

  reject() {
    var id = this.state.friendId;
    var that = this;
    api.deleteFriendRequests(id, function() {
      that.setState({status: null})
    })
  }

  send() {
    var id = this.state.friendId;
    var that = this;
    api.makeFriendRequest(id, function() {
      that.setState({status: 'outboundFriendReqPending'})
    })
  }

  


  render() {
    var that = this;

    if (this.state.status === 'inboundFriendReqToAcceptOrDelete') {
      return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.accept} onPress={this.accept}>
            <Text style={styles.text}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.reject} onPress={this.reject}>
            <Text style={styles.text}>Reject</Text>
          </TouchableOpacity>
        </View>
      )
    } else if (this.state.status === 'friend') {
      return (
        <View style={styles.friends}>
          <Text style={styles.text}>Friends <Text style={styles.checkmark}>✓</Text></Text>
        </View>
      )
    } else if (this.state.status === 'outboundFriendReqPending') {
      return (
        <View style={styles.pending}>
          <Text style={styles.italText}>Pending Request...</Text>
        </View>
      )
    } else if (this.state.status === null) {
      return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.sendRequest} onPress={this.send}>
            <Text style={styles.text}>Send Friend Request</Text>
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

var { height, width } = Dimensions.get('window');

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
  },
  sendRequest: {
    flex: 1,
    backgroundColor: 'coral',
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: width/5,
    borderRadius: 5
  },
  friends: {
    flex: 1,
  },
  checkmark: {
    color: 'green',
    fontWeight: '900',
  },
  pending: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderColor: '#eee',
    height: 40,
    backgroundColor: '#ddd',
  },
  text: {
    fontSize: 18
  },
  italText: {
    fontSize: 18,
    color: '#555'
  }
})