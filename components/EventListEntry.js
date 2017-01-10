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
} from 'react-native';

export default class EventListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.randomImage = this.randomImage.bind(this);
  }

  randomImage() {
    return 'http://lorempixel.com/400/400/';
  }

  render() {
    console.log('location:', this.props.event.location.name)
    return (
      <TouchableOpacity>
        <View style={styles.container}>
          <View style={styles.creator}>
            <Image
              style={styles.creatorPhoto}
              source={{uri: this.randomImage()}}
              />
            <Text style={styles.creatorName}>{this.props.event.location.name}</Text>
          </View >
          <View style={styles.details}>
            <Text style={styles.title}>{this.props.event.title}</Text>
            <Text style={styles.description}>Location: {this.props.event.location.streetAddress1}</Text>
          </View>
      </View>
    </TouchableOpacity>
    );
  }
}

var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: '#fbfbfb',
    paddingVertical: 6,
    minHeight: 95,
    marginBottom: 3,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {height: -3},
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
  },
  creator: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: width * .22,
    borderRightColor: '#D3D3D3',
    borderStyle: 'solid',
    borderRightWidth: 1,
  },
  creatorPhoto: {
    width: 50,
    height: 50,
  },
  creatorName: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '300',
  },
  details: {
    marginLeft: width * .02,
    width: width * .76,
  },
  title: {
    fontSize: 17
  },
  description: {
    color: 'darkslategray',
    marginTop: 5,
    marginRight: 3,
    fontSize: 13,
    fontWeight: '100'
  },
});
