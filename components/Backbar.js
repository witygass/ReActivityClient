// This component is the fixed back bar at the top of some views.
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
  Button
} from 'react-native';

export default class Backbar extends React.Component {
  constructor(props) {
    super(props);

    this.clicked = this.clicked.bind(this);
  }

  clicked() {
    console.log('This is happening.')
    this.props.navigator.pop();
  }

  render() {
    var that = this;

    return (
      <View style={styles.container} onPress={this.clicked}>
        <TouchableOpacity onPress={this.clicked} style={styles.button}>
        <Image
          source={{uri: 'https://cdn4.iconfinder.com/data/icons/pictype-free-vector-icons/16/back-512.png'}}
          style={styles.image}
          onPress={this.clicked}
        >
        </Image>
        </TouchableOpacity>
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: 40,
    backgroundColor: 'paleturquoise',
    justifyContent: 'center',
    
  },
  image: {
    height: 25,
    width: 25,
    marginLeft: 5
    
  },
  text: {
    fontSize: 18
  }
})