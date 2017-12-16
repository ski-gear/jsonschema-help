import * as React from 'react'
import { Payload } from '../containers/Payload'
import { Menu, Container, Image, Divider, Segment } from "semantic-ui-react";

const App = () => (
  <Container fluid>
		<Divider hidden />
    <Container textAlign="center">
      <Image src="/assets/images/logo.png" centered />
		</Container>
    <Payload />
		<Container fluid>
			<Menu fixed='bottom' inverted>
			<Menu.Item>Stuff</Menu.Item>
			</Menu>
		</Container>
  </Container>
);

export default App
