// I don't currently know the endpoints. They don't particularly matter, just change them
// here to whatever they need to be.

// Each of these calls pass the response into a CALLBACK FUNCTION. Please provide a callback
// function or expected behavior can't be guaranteed.

// Finally, note that some of these are POST requests, as the server needs to know certain user
// data to make decisions on return data. (Eg, nearby events, my events)

// This is used to produce DRYer code.
var fetchTemplate = function(user, callback, endpoint) {

  fetch(endpoint, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user);
  })
  .then(function(response) {
    callback(response);
  });
};

var getNearbyEvents = function(user, callback) {
  fetchTemplate(user, callback, '/events/nearby');  
}

var getMyEvents = function(user, callback) {
  fetchTemplate(user, callback, '/events/personal');
}

var getFriendEvents = function(user, callback) {
  fetchTemplate(user, callback, '/events/friends');
}

var getWatchedEvents = function(user, callback) {
  fetchTemplate(user, callback, '/events/watched');
}

// Get profile information
var getProfileInformation = function(callback) {
  fetchTemplate(user, callback, '/user/profile');
}

// Get location information (These may not be necessary at all.)
var getLocationInformation = function(callback) {
  fetchTemplate(user, callback, '/user/location');
}

// Retrieves a player's event history (Which I realize probably doesn't exist yet.)
var getEventHistory = function(callback) {
  fetchTemplate(user, callback, '/user/history');
}











