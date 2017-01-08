import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import {
  ExponentLinksView,
} from '@exponent/samples';

export default class ProfileScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Profile',
    },
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>
        <Text>This profile screen / route is free to use again or to delete</Text>
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
