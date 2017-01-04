import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import {
  ExponentLinksView,
} from '@exponent/samples';

export default class FriendsScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Friends',
    },
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
