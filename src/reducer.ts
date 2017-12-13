import { Action, AppState, ReducedAppState, Payload, ResolverConfig, Validation } from './types';
import { CHANGE_PAYLOAD_CODE, VALIDATE_PAYLOAD, VALIDATE_RESOLVER_CONFIG } from './actions';
import { assocPath, Reduced } from "ramda";
import { combineReducers, Reducer } from 'redux';

export const InitialState: AppState = {
	payload: {
		code: '{"code": null}',
		validation: {
			state: "notStarted",
			message: "",
			context: ""
		}
	},
	resolverConfig: {
		code: '{"resolver": false}',
		validation: {
			state: "notStarted",
			message: "",
			context: ""
		}
	}
};

const payloadReducer = (state: Payload = InitialState, action: Action<string|Validation>): Payload => {
	switch (action.type) {
		case VALIDATE_PAYLOAD:
		  console.log(state);
			return assocPath(['validation'], action.params, state)
		case CHANGE_PAYLOAD_CODE:
			return assocPath(['code'], action.params, state)
		default:
			return state;
	}
};

const resolverConfigReducer = (state: ResolverConfig = InitialState, action: Action<string>): ResolverConfig => {
	switch (action.type) {
		case VALIDATE_RESOLVER_CONFIG:
			return state
		default:
			return state;
	}
};

const app: Reducer<AppState> = combineReducers({
	payload: payloadReducer,
	resolverConfig: resolverConfigReducer,
});

export default app;
