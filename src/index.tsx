import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import ThunkMiddleWare from 'redux-thunk';
import app, { InitialState } from './Reducer';
import { Provider } from 'react-redux'
import App from './components/App'
import { validatePayload } from './Actions';

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
