import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  TabViewAnimated,
  TabBarTop
} from 'react-native-tab-view';

import { api } from '../lib/ajaxCalls.js'
import {store} from '../lib/reduxStore'

import FriendListEntry from '../components/FriendListEntry';
import RequestListEntry from '../components/RequestListEntry';

export default class FriendsScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      friendList: [],
      requestList: [],
      index: 0,
      routes: [
        { key: '1', title: 'Friends' },
        { key: '2', title: 'Requests' },
        { key: '3', title: 'Find' },
      ],
    };
  }

  componentWillMount() {
    api.getFriendListById(store.getState().userProfileInformation.id, (friendList) => {
      store.dispatch({
        type: 'UPDATE_USER_FRIEND_LIST',
        friendList: friendList
      });
      this.setState({friendList: friendList});
    });

    api.getFriendRequests((requestList) => {
      store.dispatch({
        type: 'UPDATE_FRIENDS_REQUESTS',
        requestList: requestList
      });
      this.setState({requestList: requestList});
    })
  }

  handleChangeTab = (index) => {
    this.setState({ index });
  };

  renderHeader = (props) => {
    return <TabBarTop {...props} style={{backgroundColor: 'coral'}}/>;
  };

  renderScene = ({ route }) => {
    switch (route.key) {
    case '1':
      return (
        <View style={styles.container}>
          <View style={styles.contentContainer}>
              <ScrollView style={styles.scrollView}>
                {this.state.friendList.map((friend) => <FriendListEntry friend={friend} key={friend.id} navigator={this.props.navigator}/>)}
              </ScrollView>
          </View>
        </View>
      );
    case '2':
      return (
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <ScrollView style={styles.scrollView}>
              {this.state.requestList.map((request) => <RequestListEntry request={request} key={request.id} navigator={this.props.navigator}/>)}
            </ScrollView>
          </View>
        </View>
      );
    case '3':
      return <View style={[ styles.page, { backgroundColor: '#673fff' } ]} />;
    default:
      return null;
    }
  };

  render() {
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this.renderScene}
        renderHeader={this.renderHeader}
        onRequestChangeTab={this.handleChangeTab}
        />
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
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
