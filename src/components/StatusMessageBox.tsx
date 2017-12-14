import * as React from 'react'
import { Divider, Container, Icon, Message, Button, SemanticCOLORS, Segment, Label } from "semantic-ui-react";

interface Props {
  color: SemanticCOLORS,
  message: string,
  context: string,
  hidden: boolean
}

export const StatusMessageBox = (props: Props) => (
  <Message
    hidden={props.hidden}
    color={props.color}
  >
    <Message.Header className="error-message">
      {props.message}
    </Message.Header>
    <Message.Content>{props.context}</Message.Content>
  </Message>
);
