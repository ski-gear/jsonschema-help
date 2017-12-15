import * as React from "react";
import { Divider, Container, Icon, Message, Button, SemanticCOLORS, Grid, Segment, Label } from "semantic-ui-react";
import Async, { Props as AsyncProps } from "react-promise";
import { validate } from "ski-mask";
import Editor from "./Editor";
import ResolverModal from "./ResolverModal";
import { JsonMessage, ValidationState } from "./types";
import { defaultPayload, defaultResolverConfig } from "./defaultValues";
import * as WebStorage from "store";
import { isNil, isEmpty } from "ramda";

interface State {
  validationState: ValidationState;
  validationMessage: string;
  validationContext?: null | string;
  code: string;
  resolverConfig: string;
}

interface Props {
  [key: string]: string;
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

const resolverConfigStorageKey = 'resolverConfig';

const formattedJsonString = (json: object): string => JSON.stringify(json, null, 4);
const resolveResolverConfig = (): string => {
  const rcFromStorage = WebStorage.get(resolverConfigStorageKey);
  return (isNil(rcFromStorage) || isEmpty(rcFromStorage)) ? formattedJsonString(defaultResolverConfig) : rcFromStorage;
}

class TopLevelContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      validationState: "notStarted",
      validationMessage: "Click to Validate",
      code: JSON.stringify(defaultPayload, null, 4),
      resolverConfig: resolveResolverConfig()
    } as State;
  }

  render() {
    return (
      <Container>
        <Divider hidden />
        <Label size="large" pointing="below">
          Add your Iglu JSON payload below and hit 'Validate'.
        </Label>
        <Grid columns={1}>
          <Grid.Row>
            <Editor code={this.state.code} ref="payloadEditor" />
          </Grid.Row>
          <Grid.Row columns="2">
            <Grid.Column>
              <Button
                loading={this.isLoading()}
                size="large"
                color="green"
                onClick={this.triggerValidation}
                floated="left"
              >
                <Icon name="legal" />&nbsp;Validate
              </Button>
            </Grid.Column>
            <Grid.Column textAlign="right">
              <ResolverModal code={this.state.resolverConfig} codeUpdated={this.resolverUpdated} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column stretched>
              <Divider />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column stretched>{this.formattedMessage()}</Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }

  resolverUpdated = (resolverConfig: string): void => {
    this.setState({ resolverConfig });
    WebStorage.set('resolverConfig', resolverConfig);
  };

  isLoading = (): boolean => this.state.validationState === "inProgress";

  isMessageHidden = (): boolean => {
    const state = this.state.validationState;
    return state === "inProgress" || state === "notStarted";
  };

  formattedMessage = (): JSX.Element => {
    return (
      <Message hidden={this.isMessageHidden()} color={messageColor(this.state.validationState)}>
        <Message.Header className="error-message">{this.state.validationMessage}</Message.Header>
        <Message.Content>{this.state.validationContext}</Message.Content>
      </Message>
    );
  };

  triggerValidation = (): void => {
    const editor = this.refs.payloadEditor as Editor;
    const latestCode = editor.state.code;
    const vState: ValidationState = "inProgress";
    this.setState({ validationState: vState, validationMessage: "Processing" });
    this.runValidation(latestCode)
      .then(msg => {
        const vState: ValidationState = msg.success ? "success" : "error";
        this.setState({
          validationMessage: msg.message,
          validationState: vState,
          validationContext: msg.context,
        });
      })
      .catch(e => {
        const vState: ValidationState = "error";
        this.setState({
          validationMessage: e.message,
          validationState: vState,
          validationContext: e.context,
        });
      });
  };

  runValidation = (code: string): Promise<JsonMessage> => {
    try {
      return validate(JSON.parse(code), JSON.parse(this.state.resolverConfig));
    } catch (e) {
      return Promise.reject({
        success: false,
        message: `Failed to parse JSON.`,
        context: code,
      });
    }
  };
}

export default TopLevelContainer;
