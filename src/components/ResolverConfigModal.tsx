import * as React from "react";
import { Divider, Container, Icon, Modal, Button, SemanticCOLORS, Grid, Segment, Label } from "semantic-ui-react";
import Editor from "./Editor";
import { JsonMessage, ValidationState } from "../Types";
import { StatusMessageBox } from "../containers/StatusMessageBox";

interface Props {
  code: string;
  loading: boolean;
  onValidate: (code: string, handleClose: Function) => () => void;
  onCodeChange: (code: string) => () => void;
  onRcModalOpen: () => () => void;
  onRcModalClose: () => () => void;
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

  handleSave = () => this.props.onValidate(this.props.code, this.handleClose.bind(this));

  handleOpen = () => {
    this.props.onRcModalOpen();
    this.setState({ modalOpen: true })
  };

  handleClose = () => {
    this.props.onRcModalClose();
    this.setState({ modalOpen: false });
  }

  render() {
    return (
      <Modal
        trigger={<Button color="blue" icon="setting" content='Resolver Config' compact size="small" floated="right" onClick={this.handleOpen} />}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        dimmer="blurring"
        closeOnDimmerClick={false}
        closeOnEscape={false}
      >
        <Modal.Content>
          <Grid columns={1}>
            <Grid.Row>
              <Label size="small" pointing="below" color="black">
                Set up your Iglu Server Resolver Configuration.
              </Label>
              <Editor code={this.props.code} onChange={this.props.onCodeChange}/>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Button color="green" onClick={this.handleSave} floated="left">
                  <Icon name="save" />Save Configuration
                </Button>
                <Button size="tiny" color="red" onClick={this.handleClose} floated="right">
                  <Icon name="cancel" />Cancel
                </Button>
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
