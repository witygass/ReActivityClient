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

export default class FilterBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toggled: false,
      options: store.getState().filterOptions
    }

    // Bind functions
    this.back = this.back.bind(this);
    this.buttonPress = this.buttonPress.bind(this);
  }

  back() {
    this.props.navigator.pop();
  }

  buttonPress() {

  }

  render() {
    var that = this;

    return (
      <View style={styles.container} onPress={this.clicked}>
        <Button 
          onPress={
            () => { console.log('button was pressed. how nice!'); }
          }
          title="Options"
          color="white"
          style={styles.options}
        />
        <Text style={styles.text}>
          
        </Text>
        <Switch
          onValueChange={(value) => this.setState({toggled: value})}
          style={styles.switch}
          value={this.state.toggled} />
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'gray'
  },
  switch: {
    flex: 1,
  },
  options: {
    flex: 1,
  },
  text: {
    flex: 3,
    fontSize: 20,
    alignSelf: 'center'
  }
})