import React from 'react';
import {
  Image,
  Button,
  Text,
  TextInput,
  View,
  ScrollView,
  StyleSheet,
  Picker
} from 'react-native';
import { store } from '../lib/reduxStore';
import { api } from '../lib/ajaxCalls';

import Backbar from '../components/Backbar';

export default class CreateEventScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      sportId: '',
      minPlayers: '',
      maxPlayers: '',
      status: '',
      description: '',
      startTime: '',
      endTime: '',
      locationName: '',
      streetAddress1: '',
      streetAddress2: null,
      city: '',
      postalCode: '',
      latitude: '',
      longitude: ''
    };

    // Bind this to functions
    this.submit = this.submit.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.navigator.pop();
  }

  render() {
    return (

      <View style={styles.container}>
        <Backbar navigator={this.props.navigator} />
        <ScrollView style={styles.container}
          contentContainer={styles.contentContainer}
        >
          <View style={styles.formContainer}>
            <Text style={styles.text}>
              Where:
            </Text>
            <TextInput
              onChangeText = {(text) => this.setState({title: text})} // Later, add redux command to update state
              style = {styles.inputStyle}
            />
            <Text style={styles.text}>
              SportId:
            </Text>
            <TextInput 
              onChangeText = {(text) => this.setState({sportId: text})} // Later, add redux te state
              style = {styles.inputStyle}
            />
            <Text style={styles.text}>
              Min Players:
            </Text>
            <TextInput
              onChangeText = {(text) => this.setState({minPlayers: text})} // Later, add redux command to update state
              style = {styles.inputStyle}
            />
            <Text style={styles.text}>
              Max Players:
            </Text>
            <TextInput
              onChangeText = {(text) => this.setState({maxPlayers: text})} // Later, add redux command to update state
              style = {styles.inputStyle}
            />
            <Text style={styles.text}>
              Status:
            </Text>
            <TextInput
              onChangeText = {(text) => this.setState({status: text})} // Later, add redux command to update state
              style = {styles.inputStyle}
            />
            <Text style={styles.text}>
              Description:
            </Text>
            <TextInput
              onChangeText = {(text) => this.setState({description: text})} // Later, add redux command to update state
              style = {styles.inputStyle}
            />
            <Text style={styles.text}>
              Start Time:
            </Text>
            <TextInput
              onChangeText = {(text) => this.setState({startTime: text})} // Later, add redux command to update state
              style = {styles.inputStyle}
            />
            <Text style={styles.text}>
              End Time:
            </Text>
            <TextInput
              onChangeText = {(text) => this.setState({endTime: text})} // Later, add redux command to update state
              style = {styles.inputStyle}
            />
            <Text style={styles.text}>
              locationName:
            </Text>
            <TextInput
              onChangeText = {(text) => this.setState({locationName: text})} // Later, add redux command to update state
              style = {styles.inputStyle}
            />
            <Text style={styles.text}>
              Street Address 1:
            </Text>
            <TextInput
              onChangeText = {(text) => this.setState({streetAddress1: text})} // Later, add redux command to update state
              style = {styles.inputStyle}
            />
            <Text style={styles.text}>
              City:
            </Text>
            <TextInput
              onChangeText = {(text) => this.setState({city: text})} // Later, add redux command to update state
              style = {styles.inputStyle}
            />
            <Text style={styles.text}>
              Zip Code:
            </Text>
            <TextInput
              onChangeText = {(text) => this.setState({postalCode: text})} // Later, add redux command to update state
              style = {styles.inputStyle}
            />
            <Text style={styles.text}>
              latitude:
            </Text>
            <TextInput
              onChangeText = {(text) => this.setState({latitude: text})} // Later, add redux command to update state
              style = {styles.inputStyle}
            />
            <Text style={styles.text}>
              longitude:
            </Text>
            <TextInput
              onChangeText = {(text) => this.setState({longitude: text})} // Later, add redux command to update state
              style = {styles.inputStyle}
            />

          </View>
          <View style={styles.buttonContainer}>
            <Button
              onPress = {this.submit}
              title = 'Submit'
              color = '#800080'
            />
          
          </View>
        </ScrollView>
      </View>
    );
  }



  submit() {
    var event = {
      title: this.state.title || 'title not provided',
      sportId: this.state.sportId || 'sportId not provided',
      minPlayers: this.state.minPlayers || 'minPlayers not provided',
      maxPlayers: this.state.maxPlayers || 'maxPlayers not provided',
      status: this.state.status || 'status not provided',
      description: this.state.description || 'description not provided',
      startTime: this.state.startTime || 'startTime not provided',
      endTime: this.state.endTime || 'endTime not provided',
      locationName: this.state.locationName || 'locationName not provided',
      streetAddress1: this.state.streetAddress1 || 'streetAddress1 not provided',
      streetAddress2: null,
      city: this.state.city || 'city not provided',
      postalCode: this.state.postalCode || 'postalCode not provided',
      latitude: this.state.latitude || 'lat not provided',
      longitude: this.state.longitude || 'long not provided'
    };

    api.createEvent(event);
    
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee'
  },
  contentContainer: {
    paddingTop: 80
  },
  formImageContainer: {
    alignItems: 'center',
    marginBottom: 20
  },
  formContainer: {
    marginTop: 10,
    marginBottom: 20
  },
  formImage: {
    width: 400,
    height: 150,
  },
  inputStyle: {
    height: 40,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 5
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 20
  },
  text: {
    fontFamily: 'rubik',
    marginLeft: 20
  }
});
