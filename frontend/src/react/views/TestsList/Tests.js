import React, { Component } from 'react';
import { connect } from 'react-redux'
import { list as getTestList } from '../../../redux/benchmarks/benchmarks';
import { Title, Level, LevelItem, Box, Button, LevelLeft, LevelRight } from 'bloomer';
import { Container } from 'bloomer/lib/layout/Container';
import { Columns } from 'bloomer/lib/grid/Columns';
import { Column } from 'bloomer/lib/grid/Column';
import { CardContent } from 'bloomer/lib/components/Card/CardContent';
import { Content } from 'bloomer/lib/elements/Content';
import { Heading } from 'bloomer/lib/elements/Heading';
import { Icon } from 'bloomer/lib/elements/Icon';

const mapDispatchToProps = dispatch => ({
  getTestList: () => dispatch(getTestList())
})


const mapStateToProps = state => ({
  testsLists: state.benchmarks.test.list
})

const Tests = 

class Tests extends Component {
  componentWillMount() {
    this.props.getTestList()
  }

  render() {
    return (
      <TestsConntainer>
        {this.props.testsLists && this.props.testsLists.length > 0 && this.props.testsLists.map((test, index) => <TestCard key={index} {...test} />)}
      </TestsConntainer>
    )
  }
}



const TestsConntainer = ({ children }) => (
  <Container>
    <Columns className="tests is-multiline">
      {children}
    </Columns>
  </Container>
)


const TestCard = ({ name, createdAt, testData, ...props }) => {
  const convertDate = (date) => {
    const d = new Date(date)
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
  }
  const date = convertDate(createdAt)
  return (
    <Column className="is-4">
      <Box className="notification is-white">
        <CardContent>
          <Content>
            <Heading>
              <Icon className="far fa-chart-bar" />
              Test name:
            </Heading>
            <Title>{name}</Title>
            <hr />
            <Level>
              <LevelLeft>
                <LevelItem>
                  <div>
                    <Heading>Uploaded at:</Heading>
                    <Title isSize={6}>
                      {date}
                    </Title>
                  </div>
                </LevelItem>
              </LevelLeft>
              <LevelRight>
                <LevelItem>
                  <div>
                    <Heading>
                      Requests samples count:
                    </Heading>
                    <Title isSize={6}>
                      {testData.length}
                    </Title>
                  </div>
                </LevelItem>
              </LevelRight>
            </Level>
            <Button className="is-rounded is-info" href={`/#/stats/${props['_id']}`}>Details</Button>
          </Content>
        </CardContent>
      </Box>
    </Column>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Tests)
