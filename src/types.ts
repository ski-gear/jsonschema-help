export interface JsonMessage {
	success: boolean,
	message: string,
	context?: string
};

export type ValidationState = 'notStarted' | 'inProgress' | 'error' | 'success';

export type ValidatableEntity = 'Payload' | 'ResolverConfig';

export interface Validation {
	state: ValidationState;
	message: string;
	context: string;
}

export interface Payload {
	payload: {
		code: string,
		validation: Validation
	}
}

export interface ResolverConfig {
	resolverConfig: {
		code: string,
		validation: Validation
	}
}

export type AppState = Payload & ResolverConfig

export interface ReducedAppState {
	app: AppState
}

export interface Action<T> {
  type: string;
  params?: T;
}
