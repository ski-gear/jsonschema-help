import * as React from 'react'
import { Divider, Container, Icon, Message, Button, SemanticCOLORS, Grid, Segment, Label } from "semantic-ui-react";
import Editor from "./Editor";
import { JsonMessage, ValidationState } from "../types";

interface Props {
  code: string,
  onValidate: (code: string) => () => void;
  onCodeChange: (code: string) => () => void;
}

export const Payload = (props: Props) => {
  const handleValidation = () => props.onValidate(props.code);

  return(
      <Container>
        <Divider hidden />
        <Label size="large" pointing="below">
          Add your Iglu JSON payload below and hit 'Validate'.
        </Label>
        <Grid columns={1}>
          <Grid.Row>
            <Editor code={props.code} onChange={props.onCodeChange}/>
          </Grid.Row>
          <Grid.Row columns="2">
            <Grid.Column>
              <Button
                // loading={this.isLoading()}
                size="large"
                color="green"
                onClick={handleValidation}
                floated="left"
              >
                <Icon name="legal" />&nbsp;Validate
              </Button>
            </Grid.Column>
            <Grid.Column textAlign="right">
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column stretched>
              <Divider />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column stretched>{}</Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
  )
}
