import { ActionType, AppState } from './types';
import { VALIDATE_PAYLOAD } from './actions';
import { assocPath } from "ramda";
import { combineReducers, Reducer } from 'redux';

export const initialState: AppState = {
  payload: {
    code: '{"code": null}',
    validation: {
      state: 'notStarted',
      message: '',
      context: ''
    }
  },
  resolverConfig: {
    code: '{"resolver": false}',
    validation: {
      state: 'notStarted',
      message: '',
      context: ''
    }
  }
};

const appReducer = (state = initialState, action: ActionType<{}>): AppState => {
  switch (action.type) {
    case VALIDATE_PAYLOAD:
      return assocPath(['payload', 'validation', 'state'], 'inProgress', state) as AppState
    default:
      return state;
  }
};

const app: Reducer<any> = combineReducers({
  app: appReducer,
});

export default app;
