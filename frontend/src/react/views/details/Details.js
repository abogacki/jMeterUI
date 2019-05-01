import React, { useEffect } from 'react';
import DetailsRoutes from "./DetailsRoutes";
import { Container, Columns, Column, Menu, MenuLabel, MenuList, MenuLink } from "bloomer";
import { getDetails as getTestDetails } from '../../../redux/details/details';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

// Refactor pending

const Index = ({ ...props }) => (
  <Container>
    <Columns>
      <Column isSize={3}>
        <DetailsMenu {...props} />
      </Column>
      <Column isSize={9}>
        <DetailsRoutes />
      </Column>
    </Columns>
  </Container>
)

// Refactor pending

const DetailsMenu = ({ testId }) => {
  return (
    <Menu>
      <MenuList>
        <li><MenuLink href={`#/details/${testId}`}>Summary</MenuLink></li>
        <li><MenuLink href={`#/details/${testId}/details`}>Statistics</MenuLink></li>
      </MenuList>
      <MenuLabel>Charts</MenuLabel>
      <MenuList>
        <li><MenuLink href={`#/details/${testId}/succesrate`}>Success rate</MenuLink></li>
        <li><MenuLink href={`#/details/${testId}/responsetimeoverview`}>Response time overview</MenuLink></li>
        <li><MenuLink href={`#/details/${testId}/activethreadsovertime`}>Active threads over time</MenuLink></li>
      </MenuList>
    </Menu>
  )
}

const mapDispatchToProps = dispatch => ({
  getTestDetails: testId => dispatch(getTestDetails(testId))
})


const DetailsIndex = ({ getTestDetails, match }) => {
  const { testId } = match.params
  useEffect(() => {
    getTestDetails(testId)
  }, [testId])

  return <Index testId={testId} />
}

export default withRouter(connect(null, mapDispatchToProps)(DetailsIndex))


