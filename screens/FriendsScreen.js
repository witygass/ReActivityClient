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

export default class FriendsScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      friendList: [],
      friendRequests: [],
      index: 0,
      routes: [
        { key: '1', title: 'Friends' },
        { key: '2', title: 'Requests' },
        { key: '3', title: 'Find' },
      ],
    };
  }

  _handleChangeTab = (index) => {
    this.setState({ index });
  };

  _renderHeader = (props) => {
    return <TabBarTop {...props} />;
  };

  _renderScene = ({ route }) => {
    var that = this;
    switch (route.key) {
    case '1':
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
    case '2':
      return <View style={[ styles.page, { backgroundColor: '#673ab7' } ]} />;
    case '3':
      return <View style={[ styles.page, { backgroundColor: '#673fff' } ]} />;
    default:
      return null;
    }
  };

  componentWillMount() {
    var that = this;
    api.getFriendListById(store.getState().userProfileInformation.id, function(friendList) {
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
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onRequestChangeTab={this._handleChangeTab}
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
