import React, {Component} from 'react';
import {
  Button,
  Dimensions,
  Modal,
  ScrollView,
  Text,
  TouchableHighlight,
  View } from 'react-native';

var {GiftedForm, GiftedFormManager} = require('react-native-gifted-form');
var moment = require('moment');
import GooglePlacesWidget from '../components/GooglePlacesWidget';
// import LocationDropDown from '../components/LocationDropDown';
import SelectMultiple from 'react-native-select-multiple'
import { api } from '../lib/ajaxCalls.js';

export default class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalInterests: false,
      city: {},
      availableInterests: [],
      selectedInterests: [],
    }
  }
  componentWillMount() {
    api.getInterests((interests) => {
      console.log(interests);
      let availableInterests = []
      for (var i = 0; i < interests.length; i++) {
        console.log(interests[i].sport, interests[i].id);
        availableInterests.push({label: interests[i].sport, value: interests[i].id});
      }
      console.log(this.state, availableInterests);
      this.setState({availableInterests: availableInterests});
    });
  }
  onSelectionsChange = (selectedFruits) => {
    // selectedFruits is array of { label, value }
    this.setState({ selectedFruits })
  }

  render() {
    var {height, width} = Dimensions.get('window');

    return (
      <View style={{flex: 1,
          flexDirection: 'row',
          alignItems: 'stretch',
          justifyContent: 'center'}}>
  <Modal
    animationType={"slide"}
    transparent={false}
    visible={this.state.modalVisible}
    onRequestClose={() => {this.setState({modalVisible: false})}}
    >
    <View style={{flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'center'}}>
    <View style={{marginTop: 25, width: width}}>
      <GooglePlacesWidget queryType='(cities)' state = {this}/>
    </View>
  </View>
      <Button
        onPress={() => {
          this.setState({modalVisible: false});
        }}
        title="Go Back"
        color="blue"
      />

  </Modal>
  <Modal
    animationType={"slide"}
    transparent={false}
    visible={this.state.modalInterests}
    onRequestClose={() => {this.setState({modalInterests: false})}}
    >
    <View style={{flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'center'}}>
        <SelectMultiple
          items={this.state.availableInterests}
          selectedItems={this.state.selectedFruits}
          onSelectionsChange={this.onSelectionsChange} />
  </View>
      <Button
        onPress={() => {
          this.setState({modalInterests: false});
        }}
        title="Confirm"
        color="blue"
      />


  </Modal>

      <GiftedForm
        formName='signupForm' // GiftedForm instances that use the same name will also share the same states

        openModal={(route) => {
          console.log('modal');
        this.setState({modalVisible: true});
          // this.props.navigator.push('googlePlacesWidget'); // The ModalWidget will be opened using this method. Tested with ExNavigator
        }}

        clearOnClose={false} // delete the values of the form when unmounted

        defaults={{
          //
          firstName : 'Marco',
          lastName : 'Polo',
          username: 'MarcoPolo',
          password: 'marcopolo',
          email: 'marco@polo.de',
          city: 'Fr',
          bioText : 'dsfasdfsd'

        }}

        validators={{
          firstName: {
            title: 'First name',
            validate: [{
              validator: 'isLength',
              arguments: [1, 23],
              message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
            }]
          },
          lastName: {
            title: 'Last name',
            validate: [{
              validator: 'isLength',
              arguments: [1, 23],
              message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
            }]
          },
          username: {
            title: 'Username',
            validate: [{
              validator: 'isLength',
              arguments: [3, 16],
              message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
            },{
              validator: 'matches',
              arguments: /^[a-zA-Z0-9]*$/,
              message: '{TITLE} can contains only alphanumeric characters'
            }]
          },
          password: {
            title: 'Password',
            validate: [{
              validator: 'isLength',
              arguments: [6, 16],
              message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
            }]
          },
          email: {
            title: 'Email address',
            validate: [{
              validator: 'isLength',
              arguments: [6, 255],
            },{
              validator: 'isEmail',
            }]
          },
          bioText: {
            title: 'Biography',
            validate: [{
              validator: 'isLength',
              arguments: [0, 512],
              message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
            }]
          },
          city: {
            title: 'City',
          },
        }}
      >

      <GiftedForm.SeparatorWidget />
      <GiftedForm.TextInputWidget
        name='firstName' // mandatory
        title='First name'

        image={require('../assets/images/icons/user.png')}

        placeholder='Marco'
        clearButtonMode='while-editing'
        />
        <GiftedForm.TextInputWidget
          name='lastName' // mandatory
          title='Last name'

          image={require('../assets/images/icons/user.png')}

          placeholder='Polo'
          clearButtonMode='while-editing'
        />


        <GiftedForm.TextInputWidget
          name='username'
          title='Username'
          image={require('../assets/images/icons/contact_card.png')}

          placeholder='MarcoPolo'
          clearButtonMode='while-editing'

          onTextInputFocus={(currentText = '') => {
            if (!currentText) {
              let fullName = GiftedFormManager.getValue('signupForm', 'fullName');
              if (fullName) {
                return firstName.replace(/[^a-zA-Z0-9-_]/g, '') + lastName.replace(/[^a-zA-Z0-9-_]/g, '');
              }
            }
            return currentText;
          }}
        />

        <GiftedForm.TextInputWidget
          name='password' // mandatory
          title='Password'

          placeholder='******'


          clearButtonMode='while-editing'
          secureTextEntry={true}
          image={require('../assets/images/icons/lock.png')}
        />

        <GiftedForm.TextInputWidget
          name='email' // mandatory
          title='Email address'
          placeholder='example@nomads.ly'

          keyboardType='email-address'

          clearButtonMode='while-editing'

          image={require('../assets/images/icons/email.png')}
        />

        <GiftedForm.SeparatorWidget />

        <GiftedForm.TextInputWidget
          name='bioText' // mandatory
          title='Biography'

          image={require('../assets/images/icons/book.png')}

          placeholder='something interesting about yourself'
          clearButtonMode='while-editing'
          />
        <GiftedForm.ModalWidget
          title='City'
          displayValue='city'
          image={require('../assets/images/icons/passport.png')}
          scrollEnabled={false}

        >
          <GiftedForm.SelectCountryWidget
            code='alpha2'
            name='city'
            title='City'
            autoFocus={true}
          />
        </GiftedForm.ModalWidget>

        <TouchableHighlight onPress={() => {
          this.setState({modalInterests: true});
        }}>
          <Text>Choose interests</Text>
        </TouchableHighlight>

        <GiftedForm.SubmitWidget
          title='Sign up'
          widgetStyles={{
            submitButton: {
              backgroundColor: "green",
            }
          }}
          onSubmit={(isValid, values, validationResults, postSubmit = null, modalNavigator = null) => {
            console.log(values, this.state);
            if (isValid === true) {
              // prepare object

              console.log(this.state);
              data = {
                firstName: values.firstName,
                lastName: values.lastName,
                username: values.username,
                password: values.password,
                email: values.email,
                bioText: values.bioText,
                homeLocation: {
                  id: this.state.details.place_id,
                  name: this.state.details.name,
                  address: this.state.details.formatted_address,
                  latitude: this.state.details.geometry.location.lat,
                  longitude: this.state.details.geometry.location.lng,
                  locationName: 'home'
                },
                interests: [22, 23, 24]
              }
              api.signupUser(function(response) {
                if (response.status === 409) {
                  postSubmit(['An error occurred, please try again']);
                  console.log(response);
                }
              }, JSON.stringify(data));
              postSubmit(['An error occurred, please try again']);
              //  then you can do:
              //  postSubmit(); // disable the loader
              //  postSubmit(['An error occurred, please try again']); // disable the loader and display an error message
              //  postSubmit(['Username already taken', 'Email already taken']); // disable the loader and display an error message
              //  GiftedFormManager.reset('signupForm'); // clear the states of the form manually. 'signupForm' is the formName used
              // GiftedFormManager.reset();

            } else {
              console.log(values, this.state.details);
            }
          }}

        />

        <GiftedForm.NoticeWidget
          title='By signing up, you agree to the Terms of Service and Privacy Policity.'
        />

        <GiftedForm.HiddenWidget name='tos' value={true} />

      </GiftedForm>
      </View>
    );
  }
};
