import * as React from "react";
import { Divider, Container, Icon, Modal, Button, SemanticCOLORS, Grid, Segment, Label } from "semantic-ui-react";
import Editor from "./Editor";
import { JsonMessage, ValidationState } from "../types";
import { StatusMessageBox } from "../containers/StatusMessageBox";

interface Props {
  code: string;
  loading: boolean;
  onValidate: (code: string) => () => void;
  onCodeChange: (code: string) => () => void;
}

interface State {
  modalOpen: boolean;
}

export class ResolverConfigModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const state: State = {
      modalOpen: false,
    };
    this.state = state;
  }

  handleSave = () => this.props.onValidate(this.props.code);
  handleOpen = () => this.setState({ modalOpen: true });
  handleClose = () => this.setState({ modalOpen: false });

  render() {
    return (
      <Modal
        trigger={<Button icon="setting" content="Edit Iglu Resolver Configuration" onClick={this.handleOpen} />}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        dimmer="blurring"
      >
        <Modal.Content>
          <Grid columns={1}>
            <Grid.Row>
              <Label size="large" pointing="below">
                Set up your Resolver Configuration below.
              </Label>
              <Editor code={this.props.code} onChange={this.props.onCodeChange}/>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Button size="small" color="green" onClick={this.handleSave} floated="left">
                  <Icon name="save" />Save Iglu Resolver Configuration
                </Button>
                <Button size="tiny" color="red" onClick={this.handleClose} floated="right">
                  <Icon name="cancel" />Cancel
                </Button>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={1}>
              <Grid.Column stretched>
                <Divider />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column stretched>
              <StatusMessageBox entity='ResolverConfig'/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>
      </Modal>
    );
  }
}
