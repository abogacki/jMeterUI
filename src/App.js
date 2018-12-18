import React, { Component } from 'react';
import './App.css';
import { Hero, HeroBody, Container, Columns, Column, Box } from 'bloomer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout/>
      </div>
    );
  }
}

const Layout = props => (<Hero>
  <HeroBody>
    <Container>
      <Columns>
        <Column>
          <Box>
            xD
        </Box>
        </Column>
      </Columns>
    </Container>
  </HeroBody>
</Hero>)

export default App;
