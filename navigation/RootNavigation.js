import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  Notifications,
} from 'exponent';
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem,
} from '@exponent/ex-navigation';
import {
  FontAwesome,
} from '@exponent/vector-icons';

import Alerts from '../constants/Alerts';
import Colors from '../constants/Colors';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

export default class RootNavigation extends React.Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
    console.log('Root navigation.js starting.')
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return (
      <TabNavigation
        id="main"
        navigatorUID="main"
        tabBarHeight={56}
        initialTab="home">
        <TabNavigationItem
          id="home"
          renderIcon={isSelected => this._renderIcon('home', isSelected)}>
          <StackNavigation initialRoute="home" />
        </TabNavigationItem>
        <TabNavigationItem
          id="map"
          renderIcon={isSelected => this._renderIcon('map-marker', isSelected)}>
          <StackNavigation initialRoute="map" />
        </TabNavigationItem>
        <TabNavigationItem
          id="realProfile"
          renderIcon={isSelected => this._renderIcon('user', isSelected)}>
          <StackNavigation initialRoute="realProfile" />
        </TabNavigationItem>
        <TabNavigationItem
          id="filterOptions"
          renderIcon={isSelected => this._renderIcon('bolt', isSelected)}>
          <StackNavigation initialRoute="filterOptions" />
        </TabNavigationItem>
        <TabNavigationItem
          id="friends"
          renderIcon={isSelected => this._renderIcon('car', isSelected)}>
          <StackNavigation initialRoute="friends" />
        </TabNavigationItem>
        <TabNavigationItem
          id="settings"
          renderIcon={isSelected => this._renderIcon('gear', isSelected)}>
          <StackNavigation initialRoute="settings" />
        </TabNavigationItem>
      </TabNavigation>
    );
  }

  _renderIcon(name, isSelected) {
    return (
      <FontAwesome
        name={name}
        size={32}
        color={isSelected ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({origin, data}) => {
    // uncomment to get back the push notification
    // this.props.navigator.showLocalAlert(
    //   `Push notification ${origin} with data: ${JSON.stringify(data)}`,
    //   Alerts.notice
    // );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  selectedTab: {
    color: Colors.tabIconSelected,
  },
});
