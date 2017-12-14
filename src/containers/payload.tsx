import { connect, Dispatch } from 'react-redux'
import { validatePayload, changeCode, VALIDATE_PAYLOAD } from '../actions';
import { Payload as PayloadComponent } from '../components/Payload'
import { AppState, ValidationState } from '../types';

const mapStateToProps = (state: AppState , ownProps: any) => {
	return {
		code: state.payload.code,
		loading: isLoading(state.payload.validation.state)
	}
}

const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: any ) => {
	return {
		onValidate: (code: string) => {
			dispatch(validatePayload(code));
		},
		onCodeChange: (code: string) => {
			dispatch(changeCode(code))
		}
	}
}

const isLoading = (vState: ValidationState): boolean => vState === 'inProgress'

export const Payload = connect(
	mapStateToProps,
	mapDispatchToProps
)(PayloadComponent)
