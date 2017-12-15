import { Action, AppState, ReducedAppState, Payload, ResolverConfig, Validation } from "./types";
import {
  CHANGE_PAYLOAD_CODE,
  CHANGE_RESOLVER_CONFIG_CODE,
  VALIDATE_PAYLOAD,
  VALIDATE_RESOLVER_CONFIG,
  SAVE_RESOLVER_CONFIG_CODE,
	OPEN_RESOLVER_CONFIG_MODAL,
	CLOSE_RESOLVER_CONFIG_MODAL,
} from "./actions";
import { assocPath, Reduced } from "ramda";
import { combineReducers, Reducer } from "redux";
import { getPayload, getResolverConfig } from "./Storage";

export const InitialState: AppState = {
  payload: {
    code: getPayload(),
    validation: {
      state: "notStarted",
      message: "",
      context: "",
    },
  },
  resolverConfig: {
    code: getResolverConfig(),
    validation: {
      state: "notStarted",
      message: "",
      context: "",
    },
  },
};

const payloadReducer = (state: Payload = InitialState, action: Action<string | Validation>): Payload => {
  switch (action.type) {
    case VALIDATE_PAYLOAD:
      return assocPath(["validation"], action.params, state);
    case CHANGE_PAYLOAD_CODE:
      return assocPath(["code"], action.params, state);
    case SAVE_RESOLVER_CONFIG_CODE:
      return assocPath(["validation"], action.params, state);
    case OPEN_RESOLVER_CONFIG_MODAL:
      return assocPath(["validation"], action.params, state);
    default:
      return state;
  }
};

const resolverConfigReducer = (state: ResolverConfig = InitialState, action: Action<string | Validation>): ResolverConfig => {
  switch (action.type) {
    case VALIDATE_RESOLVER_CONFIG:
      return assocPath(["validation"], action.params, state);
    case CHANGE_RESOLVER_CONFIG_CODE:
      return assocPath(["code"], action.params, state);
    case CLOSE_RESOLVER_CONFIG_MODAL:
      return assocPath(["validation"], action.params, state);
    default:
      return state;
  }
};

const app: Reducer<AppState> = combineReducers({
  payload: payloadReducer,
  resolverConfig: resolverConfigReducer,
});

export default app;
