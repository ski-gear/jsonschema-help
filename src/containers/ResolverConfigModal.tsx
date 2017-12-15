import { connect, Dispatch } from 'react-redux'
import { validateResolverConfig, changeResolverConfigCode } from '../actions';
import { ResolverConfigModal as ResolverConfigModalComponent } from '../components/ResolverConfigModal';
import { AppState, ValidationState, ValidatableEntity } from '../types';

const mapStateToProps = (state: AppState , ownProps: any) => {
	const root = state.resolverConfig;
	return {
		code: root.code,
		loading: isLoading(root.validation.state)
	}
}

const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: any ) => {
	return {
		onValidate: (code: string, handleCloseModal: Function) => {
			dispatch(validateResolverConfig(code, handleCloseModal));
		},
		onCodeChange: (code: string) => {
			dispatch(changeResolverConfigCode(code))
		},
	}
}

const isLoading = (vState: ValidationState): boolean => vState === 'inProgress'

export const ResolverConfigModal = connect(
	mapStateToProps,
	mapDispatchToProps
)(ResolverConfigModalComponent)
