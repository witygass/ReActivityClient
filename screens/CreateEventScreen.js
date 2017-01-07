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

export default class CreateEventScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      where: 'example',
      when: '',
      numPlayers: '',
      summary: ''
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
              onChangeText = {(text) => this.setState({where: text})} // Later, add redux command to update state
              value = {this.state.where}
              style = {styles.inputStyle}
            />
            <Text>
              When:
            </Text>
            <TextInput 
              onChangeText = {(text) => this.setState({when: text})} // Later, add redux te state
              style = {styles.inputStyle}
            />
            <Text>
              Number of Players:
            </Text>
            <TextInput
              onChangeText = {(text) => this.setState({numPlayers: text})} // Later, add redux command to update state
              style = {styles.inputStyle}
            />
            <Text>
              Summary:
            </Text>
            <TextInput
              onChangeText = {(text) => this.setState({summary: text})} // Later, add redux command to update state
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
      where: this.state.where,
      when: this.state.when,
      numPlayers: this.state.numPlayers,
      summary: this.state.summary
    };
    store.dispatch({
      type: 'ADD_EVENT',
      event: event
    });
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
