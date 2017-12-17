import * as React from 'react'
import { Payload } from '../containers/Payload'
import { Menu, Container, Image, Divider, Segment, Header, Icon } from "semantic-ui-react";
import { ResolverConfigModal } from '../containers/ResolverConfigModal';
import { ReactElement } from 'react';
import { TopMenu } from './TopMenu';

const App = () => (
  <div>
    <TopMenu />
    <Divider hidden />
    <Container>
      <SiteHeader />
    </Container>
    <Payload />
    <Menu inverted className="bottom-footer">
      <Menu.Menu position="left">
        <Menu.Item>
          <TrademarksNotice />
        </Menu.Item>
      </Menu.Menu>
      <Menu.Menu position="right">
        <Menu.Item>
          <GitHubFork />
        </Menu.Item>
        <Menu.Item>
          © {new Date().getFullYear()}&nbsp;<a href="https://github.com/ski-gear" target="_blank">
            Prem Pillai
          </a>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  </div>
);


const GitHubFork = (): ReactElement<any> => {
  return <a
    className="github-button"
    href="https://github.com/ski-gears/jsonschema-help/fork"
    data-size="large"
    data-show-count="true"
    aria-label="Fork ski-gears/jsonschema-help on GitHub">
    Fork
    </a>
}

const SiteHeader = (): ReactElement<any> => {
  return (
    <Segment stacked>
      <Header as="h1" size="small">
        A simple{" "}
        <a href="https://github.com/snowplow/" target="_blank">
          Snowplow
        </a>{" "}
        <a href="https://github.com/snowplow/iglu-central" target="_blank">
          Iglu
        </a>{" "}
        JSON Schema validator.
      </Header>
    </Segment>
  );
};

const TrademarksNotice = (): ReactElement<any> => {
  return <p>
    Snowplow and Iglu are trademarks of Snowplow Analytics and this website has no affiliations with them.
  </p>

}

export default App
