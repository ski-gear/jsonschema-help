import * as React from 'react'
import { Payload } from '../containers/Payload'
import { Menu, Container, Image, Divider, Segment } from "semantic-ui-react";
import { ResolverConfigModal } from '../containers/ResolverConfigModal';

const App = () => (
  <Container fluid>
    <Container fluid>
      <Container>
        <Menu secondary>
          <Menu.Item>
            <Image src="/assets/images/logo.png" centered />
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <GitHubStar />
            </Menu.Item>
            <Menu.Item>
              <GitHubIssue />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Container>
    </Container>
    <Container textAlign="center" />
    <Payload />
    <Container fluid>
      <Menu fixed="bottom" inverted>
        <Menu.Item>Stuff</Menu.Item>
      </Menu>
    </Container>
  </Container>
);

const GitHubStar = (): React.ReactElement<string> => {
	return <a
		className="github-button"
		href="https://github.com/ski-gear/jsonschema-help"
		data-icon="octicon-star"
		data-size="large"
		data-show-count="true"
		aria-label="Star ski-gear/jsonschema-help on GitHub">
      Star me on GitHub
    </a>
}

const GitHubIssue = (): React.ReactElement<string> => {
	return <a
		className="github-button"
		href="https://github.com/ski-gear/jsonschema-help/issues"
		data-icon="octicon-issue-opened"
		data-size="large"
		data-show-count="true"
		aria-label="Issue ski-gear/jsonschema-help on GitHub">
		Report an Issue
		</a>
}

export default App
