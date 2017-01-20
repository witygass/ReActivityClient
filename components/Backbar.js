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
    this.props.navigator.pop();
  }

  render() {
    var that = this;

    return (
      <View style={styles.container} onPress={this.clicked}>
        <TouchableOpacity onPress={this.clicked} style={styles.button}>
        <Image
          source={{uri: 'https://cdn.pixabay.com/photo/2016/09/05/10/50/app-1646213_960_720.png'}}
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
    backgroundColor: 'coral',
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