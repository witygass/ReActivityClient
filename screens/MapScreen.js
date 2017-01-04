import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import {
  ExponentLinksView,
} from '@exponent/samples';

export default class MapScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Map',
    },
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>
        <Text style={styles.content}>This is where the map screen will live</Text>
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
