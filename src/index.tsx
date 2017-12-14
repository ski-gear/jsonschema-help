import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import ThunkMiddleWare from 'redux-thunk';
import app, { InitialState } from './reducer';
import { Provider } from 'react-redux'
import App from './components/App'
import { validatePayload } from './actions';

let store = createStore(
  app,
  InitialState,
  applyMiddleware(ThunkMiddleWare)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
