import React from 'react';
import {
  ActivityIndicator,
  Button,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';


import Exponent, {
  Constants,
  ImagePicker
} from 'exponent';

import { api } from '../lib/ajaxCalls.js';
import Backbar from '../components/Backbar';

export default class ImageUpload extends React.Component {


  state = {
    image: null,
    uploading: false
  }


  render() {
    let { image } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.headerBar}>
            <Backbar navigator={this.props.navigator} />
          <Text style={styles.headerSpacer}></Text>
          <Text style={styles.headerTitle}>
            Upload an Image
          </Text>
        </View>

        <View style={styles.buttons}>
        <Button
          onPress={this._pickImage}
          title='Choose Image...'
          color="black"
        />

        <Button
          onPress={this._takePhoto}
          title='Take Photo'
          color="black"
        />

        { this._maybeRenderImage() }
        { this._maybeRenderUploadingOverlay() }

        <StatusBar barStyle='default' />
      </View>
      </View>
    );
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View style={[StyleSheet.absoluteFill, {backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent:'center'}]}>
          <ActivityIndicator color='#fff' animating size='large' />
        </View>
      );
    }
  }

  _maybeRenderImage = () => {
    let { image } = this.state;
    if (!image) {
      return;
    }

    return (
      <View style={styles.imgRender}>
        <View style={styles.img}>
          <Image source={{uri: image}} style={{width: 250, height: 250}} />
        </View>

        <Text style={styles.text2}>
          { image }
        </Text>
      </View>
    );
  }

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    this._handleImagePicked(pickerResult);
  }

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4,3]
    });

    this._handleImagePicked(pickerResult);
  }

  _handleImagePicked = async (pickerResult) => {
    let uploadResponse, uploadResult;

    try {
      this.setState({uploading: true});

      if (!pickerResult.cancelled) {
        uploadResponse = await uploadImageAsync(pickerResult.uri);
        uploadResult = await uploadResponse.json();
        this.setState({image: uploadResult.location});
      }
    }
    // catch(e) {
    //   alert('Upload failed. Sorry about that. Error:', e);
    // }
    finally {
      this.setState({uploading: false});
    }
  }
}

async function uploadImageAsync(uri) {
  let apiUrl = 'back/end/route/goes/here.com/route/to/upload';

  // The following is for testing on local server. Comment to use route above.
  if (Constants.isDevice) {
    apiUrl = 'http://1cdbe150.ngrok.io/ROUTE/GOES/HERE';
  } else {
    apiUrl = 'http://localhost:3000/ROUTE/GOES/HERE';
  }
  // If commenting out, stop here.

  let uriParts = uri.split('.');
  let fileType = uri[uri.length - 1];

  let formData = new FormData();
  formData.append('photo', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`
  });

  let options = {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
    }
  };

  return api.uploadPhoto(options, function(photo) {
    return photo;
  });
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  headerBar: {
    flex: 1,
    maxHeight: 40,
    backgroundColor: 'coral',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  headerTitle: {
    flex: 10,
    fontSize: 18,
    alignSelf: 'center',
    color: 'black',
    fontFamily: 'rubik',
    textAlign: 'center'
  },
  buttons: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  text1: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    marginHorizontal: 15
  },
  imgRender: {
    marginTop: 30,
    width: 250,
    borderRadius: 3,
    elevation: 2,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.2,
    shadowOffset: {width: 4, height: 4},
    shadowRadius: 5
  },
  img: {
    borderTopRightRadius: 3,
    borderTopLeftRadius: 3,
    overflow: 'hidden'
  },
  text2: {
    paddingVertical: 10,
    paddingHorizontal: 10
  }


})
