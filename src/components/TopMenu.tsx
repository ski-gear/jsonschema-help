import { ReactElement } from 'react';
import * as React from 'react'
import { Menu, Container, Image, Divider, Segment } from "semantic-ui-react";

export const TopMenu = (): ReactElement<any> => {
  return <Container className="top-menu">
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
    </Container>;
};

const GitHubStar = (): ReactElement<any> => {
	return <a
		className="github-button"
		href="https://github.com/ski-gear/jsonschema-help"
		data-size="large"
		data-show-count="true"
		aria-label="Star ski-gear/jsonschema-help on GitHub">
      Star
    </a>
}

const GitHubIssue = (): ReactElement<any> => {
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
