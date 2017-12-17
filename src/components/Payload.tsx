import * as React from 'react'
import { Divider, Container, Icon, Message, Button, SemanticCOLORS, Grid, Segment, Label } from "semantic-ui-react";
import Editor from "./Editor";
import { JsonMessage, ValidationState } from "../Types";
import { StatusMessageBox } from '../containers/StatusMessageBox';
import { ResolverConfigModal } from '../containers/ResolverConfigModal';

interface Props {
  code: string,
  resolverConfig: string,
  loading: boolean,
  onValidate: (code: string, resolverConfig: string) => () => void;
  onCodeChange: (code: string) => () => void;
}

export const Payload = (props: Props) => {
  const handleValidation = () => props.onValidate(props.code, props.resolverConfig);

  return <Container>
      <Divider hidden />
      <Grid columns={2}>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Label size="large" pointing="below" color="black">
              Add your Iglu JSON payload here.
            </Label>
          </Grid.Column>
          <Grid.Column>
            <ResolverConfigModal />
          </Grid.Column>
          <Editor code={props.code} onChange={props.onCodeChange} />
        </Grid.Row>
        <Grid.Row columns="2">
          <Grid.Column>
            <Button loading={props.loading} size="large" color="green" onClick={handleValidation} floated="left">
              <Icon name="legal" />
              Validate
            </Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column stretched>
            <StatusMessageBox entity="Payload" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>;
}
