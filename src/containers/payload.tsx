import { connect, Dispatch } from 'react-redux'
import { validatePayload, changePayloadCode } from '../Actions';
import { Payload as PayloadComponent } from '../components/Payload'
import { AppState, ValidationState, ValidatableEntity } from '../Types';

const mapStateToProps = (state: AppState , ownProps: any) => {
	return {
		code: state.payload.code,
		resolverConfig: state.resolverConfig.code,
		loading: isLoading(state.payload.validation.state)
	}
}

const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: any ) => {
	return {
		onValidate: (code: string, resolverConfig: string) => {
			dispatch(validatePayload(code, resolverConfig));
		},
		onCodeChange: (code: string) => {
			dispatch(changePayloadCode(code))
		}
	}
}

const isLoading = (vState: ValidationState): boolean => vState === 'inProgress'

export const Payload = connect(
	mapStateToProps,
	mapDispatchToProps
)(PayloadComponent)
