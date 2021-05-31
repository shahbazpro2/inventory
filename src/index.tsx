import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';

import { createStore } from 'redux'
import rootReducer from './Reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
const store = createStore(rootReducer, composeWithDevTools())

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
);

