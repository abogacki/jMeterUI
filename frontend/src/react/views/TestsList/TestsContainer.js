import React from 'react'
import { Container } from 'bloomer/lib/layout/Container';
import { Columns } from 'bloomer/lib/grid/Columns';

const TestsContainer = ({ children }) => (
  <Container>
    <Columns className="tests is-multiline">
      {children}
    </Columns>
  </Container>
)

export default TestsContainer