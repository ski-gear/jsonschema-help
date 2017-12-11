export type JsonMessage= {
	success: boolean,
	message: string,
	context?: string
};

export type ValidationState = 'notStarted' | 'inProgress' | 'error' | 'success';
