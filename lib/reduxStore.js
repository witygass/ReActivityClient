import { createStore } from 'redux';

// Actions

var exampleUpdateMessage = function(newMessage) {
  return {
    type: 'EXAMPLE_UPDATE_MESSAGE',
    message: newMessage
  }
};

// var addEvent = function(newEvent) {
//   return {
//     type: 'ADD_EVENT',
//     message: newEvent
//   }
// }

// Default state

defaultState = {
  username: '',
  events: []
}

// Reducer

var reducer = function(state = defaultState, action) {
  if (action.type === 'EXAMPLE_UPDATE_MESSAGE') {
    Object.assign({}, state, {
      message: action.message
    });
  }
  if (action.type === 'ADD_EVENT') {
    var copy = Object.assign({}, state);
    copy.events.push(action.event);
    console.log('Event added! State is:', copy);
    return copy;
  }
  else {
    return state;
  }
}

// Store

var store = createStore(reducer);

module.exports = {
  store: store
};