// This is a state contract -- redux store state should contain the following information.
// If it should be necessary to have more information stored on state, reflect those changes here.

var state = {
  userProfileInformation: {
    username: 'String',
    name: 'String',
    bio: 'String',
    feed: ['String', 'String', 'String'],             // A user's recently completed events.
    photo: {
      small: 'String',
      medium: 'String',
      large: 'String'
    }
  },
  userUpcomingEvents: [],
  profileUrl: '',
  interests: [],
  locationDetails: {
    town: '',
    state: '',
    country: '',
    lat: 'num',
    lon: 'num'
  },
  userToken: ['String'],
  userFriends: ['Object[miniProfile]', 'Object[miniProfile]'],
  nearbyEvents: ['Object[event]', 'Object[event]'],
  friendsEvents: ['Object[event]', 'Object[event]'],
  watchedEvents: ['Object[event]', 'Object[event]'],
  myEvents: ['Object[event]', 'Object[event]'],

  // The following are more variable in nature; they reflect structural state
  currentlyViewing: 'Object[event]'
}

/*

upcoming
profile url
interests
next 5 activites
location details



*/

// These are object contracts. They describe the shape of various useful objects. Should an object
// need a different shape, please reflect those changes here.

var event = {
  id: 'Number[unique]',
  location: {
    name: 'String',
    latitude: 'Number',
    longitude: 'Number',
    geom: 'Geometry'
  },
  time: {
    created: 'Date',
    startTime: 'Date',
    endTime: 'Date'
  },
  eventType: 'String(e.g., "Basketball")',
  minPlayers: 'Number or Null',
  maxPlayers: 'Number or Null',
  eventPhoto: 'String',
  attendees: [],
  creatorUserName: '',
  eventName: '',
  eventDescription: ''
}



var miniProfile = {
  username: 'String'
  // ajax for rest
}


