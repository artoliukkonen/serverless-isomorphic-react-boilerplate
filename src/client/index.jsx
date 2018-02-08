import React from 'react';
import ReactDOM from 'react-dom';
// import { AppContainer } from 'react-hot-loader';
import App from './App';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import './images';

const client = new ApiClient();
const store = createStore(
  window.__INITIAL_STATE__, // eslint-disable-line
  client,
);

ReactDOM.hydrate(
  (
    <App
      store={store}
      type="client"
    />
  ),
  document.getElementById('app'),
);

if ('serviceWorker' in window.navigator) {
  window.navigator.serviceWorker.register('/sw.js', { scope: '/' });
}
