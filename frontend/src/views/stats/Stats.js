import React, { Component } from 'react';
import StatsRouter from "./StatsRoutes";
import { Container, Columns, Column, Menu, MenuLabel, MenuList, MenuLink } from "bloomer";
import { getDetails as getTestDetails } from '../../actions/benchmarkDataActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

const Index = ({...props}) => (
    <Container>
        <Columns>
            <Column isSize={3}>
                <StatsMenu {...props} />
            </Column>
            <Column isSize={9}>
                <StatsRouter />
            </Column>
        </Columns>
    </Container>
)

const StatsMenu = ({ testId }) => {
    return (
        <Menu>
            <MenuList>
                <li><MenuLink href={`#/stats/${testId}`}>Summary</MenuLink></li>
                <li><MenuLink href={`#/stats/${testId}/stats`}>Statistics</MenuLink></li>
            </MenuList>
            <MenuLabel>Charts</MenuLabel>
            <MenuList>
                <li><MenuLink href={`#/stats/${testId}/succesrate`}>Success rate</MenuLink></li>
                <li><MenuLink href={`#/stats/${testId}/responsetimeoverview`}>Response time overview</MenuLink></li>
                <li><MenuLink href={`#/stats/${testId}/activethreadsovertime`}>Active threads over time</MenuLink></li>
            </MenuList>
        </Menu>
    )
}



const mapDispatchToProps = dispatch => ({
    getTestDetails: testId => dispatch(getTestDetails(testId))
})

class StatsIndex extends Component {
    componentWillMount() {
        const { testId } = this.props.match.params
        this.props.getTestDetails(testId)
    }
    render() {
        const { testId } = this.props.match.params
        return (
            <Index testId={testId} />
        );
    }
}

export default withRouter(connect(null, mapDispatchToProps)(StatsIndex))


