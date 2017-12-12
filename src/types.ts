export interface JsonMessage {
	success: boolean,
	message: string,
	context?: string
};

export type ValidationState = 'notStarted' | 'inProgress' | 'error' | 'success';

interface Validation {
	state: ValidationState;
	message: string;
	context: string;
}

export interface AppState {
	payload: {
		code: string,
		validation: Validation
	},
	resolverConfig: {
		code: string,
		validation: Validation
	}
}

export interface ReducedAppState {
	app: AppState
}

interface Action<T> {
  type: string;
  payload?: T;
}

export type ActionType<T> = Action<T>;
