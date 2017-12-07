import * as React from 'react'
import { Divider, Container, Message, Button, SemanticCOLORS, Grid, Segment } from 'semantic-ui-react'
import Hello from "./Hello";
import Async, { Props as AsyncProps } from 'react-promise'
import { validate } from "ski-mask";

type JsonMessage= {
  success: boolean,
  message: string,
  context?: string
};

type ValidationState = 'notStarted' | 'inProgress' | 'error' | 'success';

interface State {
  validationState: ValidationState,
  validationMessage: string,
  validationContext?: null | string
};

interface Props {
  [ key: string ]: string
};

const messageColor = (vState: string): SemanticCOLORS => {
  switch (vState) {
    case 'error':
      return 'red'
    case 'success':
      return 'green'
    case 'inProgress':
      return 'yellow'
    default:
      return 'blue'
  }
}

class TopLevelContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      validationState: 'notStarted',
      validationMessage: 'Click to Validate'
    } as State;
  }

  render() {
    return (
      <Container>
        <div>
          <Message
            color={messageColor(this.state.validationState)}
            icon='code'
            header='Validate Iglu Paylods'
            content={this.state.validationMessage}
          />
          <Divider />
          <Grid stackable columns={2}>
            <Grid.Column>
              <Segment>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
              </Segment>
            </Grid.Column>
          </Grid>
        </div>
        
        <div>
          <Button onClick={this.handleClick}>
            Validate
          </Button>
        </div>
      </Container>
    )
  };

  handleClick = (): void => {
    const vState: ValidationState= 'inProgress';
    this.setState({ validationState: vState, validationMessage: 'Processing' })
    this.message().then(
      (msg) => {
        const vState: ValidationState = msg.success ? 'success' : 'error';
        this.setState(
          {
            validationMessage: msg.message,
            validationState: vState
          }
        )
      }
    ).catch(
      (e) => {
        const vState: ValidationState = 'error';
        this.setState(
          {
            validationMessage: e.message,
            validationState: vState,
            validationContext: e.context 
          }
        )
      }
    )
  }

  json = {
    "schema": "iglu:com.snowplowanalytics.snowplow/unstruct_event/jsonschema/1-0-0",
    "data": {
      "schema": "iglu:com.snowplowanalytics.snowplow/link_click/jsonschema/1-0-0",
      "data": {
        "targetUrl": "https://myawesomeurl.com/data",
        "elementI": "bestElementEver"
      }
    }
  }

  resolverConfig = {
    "schema": "iglu:com.snowplowanalytics.iglu/resolver-config/jsonschema/1-0-0",
    "data":
      {
        "cacheSize": 500,
        "repositories":
          [
            {
              "name": "Iglu Central",
              "priority": 0,
              "vendorPrefixes":
                [
                  "com.snowplowanalytics.snowplow"
                ],
              "connection":
                {
                  "http":
                    {
                      "uri": "http://iglucentral.com"
                    }
                }
            },
            {
              "name": "My Iglu Server",
              "priority": 1,
              "vendorPrefixes":
                [
                  "com.my-iglu-server"
                ],
              "connection":
                {
                  "http":
                    {
                      "uri": "http://awesome-schemas.my-iglu-server.com"
                    }
                }
            }
          ]
      }
  };

  message = (): Promise<JsonMessage> => {
    return validate(this.json, this.resolverConfig);
  }
}

export default TopLevelContainer
