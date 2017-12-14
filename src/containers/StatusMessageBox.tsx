import { connect, Dispatch } from 'react-redux'
import { StatusMessageBox as StatusMessageBoxComponent } from '../components/StatusMessageBox';
import { AppState, ValidationState, ValidatableEntity } from '../types';
import { SemanticCOLORS } from 'semantic-ui-react';

interface Props {
  entity: ValidatableEntity
}

const mapStateToProps = (state: AppState , ownProps: Props) => {
  const entityRoot = ownProps.entity === 'Payload' ? state.payload : state.resolverConfig;
	const validation = entityRoot.validation
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
