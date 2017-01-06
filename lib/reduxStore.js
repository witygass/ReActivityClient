import { createStore } from 'redux';

// Actions

var exampleUpdateMessage = function(newMessage) {
  return {
    type: 'EXAMPLE_UPDATE_MESSAGE',
    message: newMessage
  }
};

// Default state

defaultState = {
  message: ''
}

// Reducer

var reducer = function(state = defaultState, action) {
  if (action.type === 'EXAMPLE_UPDATE_MESSAGE') {
    Object.assign({}, state, {
      message: action.message
    });
  }
  else {
    return state;
  }
}

// Store

var store = createStore(reducer);

module.exports = store;