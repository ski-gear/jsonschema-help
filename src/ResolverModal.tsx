import * as React from 'react';
import Editor from "./Editor";
import { Divider, Container, Icon, Button, Grid, Segment, Label, Modal, Header } from 'semantic-ui-react'

interface Props {
  code: string;
  codeUpdated: (code: string) => void;
};

interface State {
  modalOpen: boolean
}

class ResolverModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const state: State = {
      modalOpen: false
    };
    this.state = state;
  }

  handleOpen = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({ modalOpen: false })

  saveResolverConfig = () => {
    this.handleClose();
    const editor = this.refs.resolverEditor as Editor;
    const latestCode = editor.state.code;
    this.props.codeUpdated(latestCode);
  }

  render() {
    return <Container>
        <Modal
          trigger={<Button icon="setting" onClick={this.handleOpen} />}
          open={this.state.modalOpen}
          onClose={this.handleClose}
          dimmer='blurring'
        >
          <Modal.Content>
            <Grid columns={1}>
              <Grid.Row>
                <Label size="large" pointing="below">
                  Set up your Resolver Configuration below.
                </Label>
                <Editor code={this.props.code} ref="resolverEditor" />
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Button size="small" color="green" onClick={this.saveResolverConfig} floated="left">
                    <Icon name="save" />&nbsp;Save Resolver Configuration
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Modal.Content>
        </Modal>
      </Container>;
  }
}

export default ResolverModal
