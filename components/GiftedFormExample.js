import React from 'react';
import {
  Text,
  View,
} from 'react-native';

var {GiftedForm, GiftedFormManager} = require('react-native-gifted-form');
var moment = require('moment');

export default class GiftedFormExample extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <GiftedForm
        formName='signupForm' // GiftedForm instances that use the same name will also share the same states

        openModal={(route) => {
          console.log('modal');
          // for (var key in route) {
          //   console.log(key, route[key]);
          // }
          this.props.navigator.push('googlePlacesWidget'); // The ModalWidget will be opened using this method. Tested with ExNavigator
        }}

        clearOnClose={false} // delete the values of the form when unmounted

        defaults={{
          //
          fullName : '',
          username: '',
          password: '',
          emailAddress: '',
          country: 'FR',
          bio : 'more Text'

        }}

        validators={{
          fullName: {
            title: 'Full name',
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
          emailAddress: {
            title: 'Email address',
            validate: [{
              validator: 'isLength',
              arguments: [6, 255],
            },{
              validator: 'isEmail',
            }]
          },
          bio: {
            title: 'Biography',
            validate: [{
              validator: 'isLength',
              arguments: [0, 512],
              message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
            }]
          },
          country: {
            title: 'Country',
            validate: [{
              validator: 'isLength',
              arguments: [2],
              message: '{TITLE} is required'
            }]
          },
        }}
      >

        <GiftedForm.SeparatorWidget />
        <GiftedForm.TextInputWidget
          name='fullName' // mandatory
          title='Full name'

          image={require('../assets/images/icons/user.png')}

          placeholder='Marco Polo'
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
                return fullName.replace(/[^a-zA-Z0-9-_]/g, '');
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
          name='emailAddress' // mandatory
          title='Email address'
          placeholder='example@nomads.ly'

          keyboardType='email-address'

          clearButtonMode='while-editing'

          image={require('../assets/images/icons/email.png')}
        />

        <GiftedForm.SeparatorWidget />

        <GiftedForm.ModalWidget
          title='Country'
          displayValue='country'
          image={require('../assets/images/icons/passport.png')}
          scrollEnabled={false}

        >
          <GiftedForm.SelectCountryWidget
            code='alpha2'
            name='country'
            title='Country'
            autoFocus={true}
          />
        </GiftedForm.ModalWidget>


        <GiftedForm.ModalWidget
          title='Biography'
          displayValue='bio'

          image={require('../assets/images/icons/book.png')}

          scrollEnabled={true} // true by default
        >
          <GiftedForm.SeparatorWidget/>
          <GiftedForm.TextAreaWidget
            name='bio'

            autoFocus={true}

            placeholder='Something interesting about yourself'
          />
        </GiftedForm.ModalWidget>



        <GiftedForm.SubmitWidget
          title='Sign up'
          widgetStyles={{
            submitButton: {
              backgroundColor: "green",
            }
          }}
          onSubmit={(isValid, values, validationResults, postSubmit = null, modalNavigator = null) => {
            if (isValid === true) {
              // prepare object
              console.log(values);
              //  Implement the request to your server using values variable
              //  then you can do:
              //  postSubmit(); // disable the loader
              //  postSubmit(['An error occurred, please try again']); // disable the loader and display an error message
              //  postSubmit(['Username already taken', 'Email already taken']); // disable the loader and display an error message
              //  GiftedFormManager.reset('signupForm'); // clear the states of the form manually. 'signupForm' is the formName used
              GiftedFormManager.reset();
              postSubmit();
            }
          }}

        />

        <GiftedForm.NoticeWidget
          title='By signing up, you agree to the Terms of Service and Privacy Policity.'
        />

        <GiftedForm.HiddenWidget name='tos' value={true} />

      </GiftedForm>
    );
  }
};
