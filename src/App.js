import React, { Component } from 'react';
import './App.scss';
import { Hero, HeroBody, Container, Columns, Column, Box } from 'bloomer';
import { Input } from 'bloomer/lib/elements/Form/Input';

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
            <Input />
        </Box>
        </Column>
      </Columns>
    </Container>
  </HeroBody>
</Hero>)

export default App;
