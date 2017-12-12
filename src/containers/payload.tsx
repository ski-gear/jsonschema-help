import { connect, Dispatch } from 'react-redux'
import { validatePayload } from '../actions'
import { Test } from '../components/test'
import { ReducedAppState } from '../types';

const mapStateToProps = (state: ReducedAppState , ownProps: any) => {
	return {
		code: state.app.payload.code
	}
}

const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: any ) => {
	return {
		onClick: () => {
			dispatch(validatePayload(ownProps.code))
		}
	}
}

export const Payload = connect(
	mapStateToProps,
	mapDispatchToProps
)(Test)
