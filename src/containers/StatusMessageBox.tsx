import { connect, Dispatch } from 'react-redux'
import { validatePayload, changeCode, VALIDATE_PAYLOAD } from '../actions';
import { StatusMessageBox as StatusMessageBoxComponent } from '../components/StatusMessageBox';
import { AppState, ValidationState } from '../types';
import { SemanticCOLORS } from 'semantic-ui-react';

const mapStateToProps = (state: AppState , ownProps: any) => {
	const validation = state.payload.validation
	return {
		hidden: messageHidden(validation.state),
		color: messageColor(validation.state),
		message: validation.message,
		context: validation.context
	}
}

const messageColor = (vState: ValidationState): SemanticCOLORS => {
  switch (vState) {
    case "error":
      return "red";
    case "success":
      return "green";
    case "inProgress":
      return "yellow";
    default:
      return "blue";
  }
};

const messageHidden = (vState: ValidationState): boolean => {
	return vState === 'notStarted'
}

export const StatusMessageBox = connect(
	mapStateToProps,
)(StatusMessageBoxComponent)
