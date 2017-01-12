import React from 'react';
import {
  Image,
  Button,
  Text,
  TextInput,
  View,
  ScrollView,
  StyleSheet
} from 'react-native';
import { store } from '../lib/reduxStore.js';
import { api } from '../lib/ajaxCalls.js';

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
        <ScrollView style={styles.container}
          contentContainer={styles.contentContainer}>
          <View style={styles.formImageContainer}>
            <Image
              style={styles.formImage}
              source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Grapes_%284737199646%29.jpg'}}/>
              <Button
                onPress={this.goBack}
                title={'<= Go Back'}
                style={{alignSelf: 'left'}}
              />
          </View>
          <View style={styles.formContainer}>
            <Text>
              Where:
            </Text>
            <TextInput
              onChangeText = {(text) => this.setState({title: text})} // Later, add redux command to update state
              style = {styles.inputStyle}
            />
            <Text>
              SportId:
            </Text>
            <TextInput 
              onChangeText = {(text) => this.setState({sportId: text})} // Later, add redux te state
              style = {styles.inputStyle}
            />
            <Text>
              Min Players:
            </Text>
            <TextInput
              onChangeText = {(text) => this.setState({minPlayers: text})} // Later, add redux command to update state
              style = {styles.inputStyle}
            />
            <Text>
              Max Players:
            </Text>
            <TextInput
              onChangeText = {(text) => this.setState({maxPlayers: text})} // Later, add redux command to update state
              style = {styles.inputStyle}
            />
            <Text>
              Status:
            </Text>
            <TextInput
              onChangeText = {(text) => this.setState({status: text})} // Later, add redux command to update state
              style = {styles.inputStyle}
            />
            <Text>
              Description:
            </Text>
            <TextInput
              onChangeText = {(text) => this.setState({description: text})} // Later, add redux command to update state
              style = {styles.inputStyle}
            />
            <Text>
              Start Time:
            </Text>
            <TextInput
              onChangeText = {(text) => this.setState({startTime: text})} // Later, add redux command to update state
              style = {styles.inputStyle}
            />
            <Text>
              End Time:
            </Text>
            <TextInput
              onChangeText = {(text) => this.setState({endTime: text})} // Later, add redux command to update state
              style = {styles.inputStyle}
            />
            <Text>
              locationName:
            </Text>
            <TextInput
              onChangeText = {(text) => this.setState({locationName: text})} // Later, add redux command to update state
              style = {styles.inputStyle}
            />
            <Text>
              Street Address 1:
            </Text>
            <TextInput
              onChangeText = {(text) => this.setState({streetAddress1: text})} // Later, add redux command to update state
              style = {styles.inputStyle}
            />
            <Text>
              City:
            </Text>
            <TextInput
              onChangeText = {(text) => this.setState({city: text})} // Later, add redux command to update state
              style = {styles.inputStyle}
            />
            <Text>
              Zip Code:
            </Text>
            <TextInput
              onChangeText = {(text) => this.setState({postalCode: text})} // Later, add redux command to update state
              style = {styles.inputStyle}
            />
            <Text>
              latitude:
            </Text>
            <TextInput
              onChangeText = {(text) => this.setState({latitude: text})} // Later, add redux command to update state
              style = {styles.inputStyle}
            />
            <Text>
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
            <Button
              onPress = {this.submit}
              title = 'Save For Later'
              color = '#800080'
            />
          </View>
        </ScrollView>
      </View>
    );
  }



  submit() {
    var event = {
      title: this.state.title,
      sportId: this.state.sportId,
      minPlayers: this.state.minPlayers,
      maxPlayers: this.state.maxPlayers,
      status: this.state.status,
      description: this.state.description,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      locationName: this.state.locationName,
      streetAddress1: this.state.streetAddress1,
      streetAddress2: null,
      city: this.state.city,
      postalCode: this.state.postalCode,
      latitude: this.state.latitude,
      longitude: this.state.longitude
    };

    api.createEvent(event);
    
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  contentContainer: {
    paddingTop: 80
  },
  formImageContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  formContainer: {
    marginTop: 10,
    marginBottom: 20
  },
  formImage: {
    width: 400,
    height: 150,
    marginTop: 3
  },
  inputStyle: {
    height: 40
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 20
  }
});
