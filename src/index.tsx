import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import app from './reducer';
import { Provider } from 'react-redux'
import App from './components/App'

let store = createStore(app);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
