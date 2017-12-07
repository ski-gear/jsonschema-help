import * as React from 'react'
import { Container } from 'semantic-ui-react'
import Hello from "./Hello";

const TopLevelContainer = () => (
  <Container>
    <div>
      <Hello name="JSON Schema Help" />
    </div>
  </Container>
)

export default TopLevelContainer
