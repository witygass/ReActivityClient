import React from 'react';

import { AsyncStorage } from 'react-native';
import { store } from './reduxStore';
// import { serverUrl } from './localvars.js';


// This needs to be changed in localvars.js too.
var baseUrl = 'http://555f9f68.ngrok.io';
var api = {};

var fetchTemplate = function(callback, endpoint) {
  AsyncStorage.getItem('JWTtoken').then((token) => {
    return fetch(endpoint, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': ('JWT ' + token)
      }
    })
  })
  .then(function(response) {  
    var a = response._bodyInit;
    a = JSON.parse(a);
    callback(a);
  });
};


api.getNearbyEvents = function(callback) {
  var lat = 70, lon = 23;
  fetchTemplate(callback, baseUrl + '/api/activities/nearby/' + lat + '/' + lon + '/25');
}

api.getUserByUsername = function(username, callback) {
  fetchTemplate(callback, baseUrl + '/api/profile/' + username);
}

api.getEventById = function(id, callback) {
  fetchTemplate(callback, baseUrl + '/api/activities/' + id);
}


module.exports = {
  api: api
}
