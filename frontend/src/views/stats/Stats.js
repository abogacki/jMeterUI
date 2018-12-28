import React, { Component } from 'react';
import StatsRouter from "./StatsRoutes";
import { Container, Columns, Column, Menu, MenuLabel, MenuList, MenuLink, Title, } from "bloomer";
import LoaderInput from '../../components/loadInput';
import { getDetails as getTestDetails } from '../../actions/benchmarkDataActions';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'

const Index = props => (
    <Container>
        <Columns>
            <Column isSize='full' hasTextAlign="centered" >
                <Title className="has-text-weight-light">
                    Upload new data
                </Title>
                <LoaderInput />
            </Column>
        </Columns>
        <Columns>
            <Column isSize={3}>
                <StatsMenu />
            </Column>
            <Column isSize={9}>
                <StatsRouter />
            </Column>
        </Columns>
    </Container>
)

const StatsMenu = ({ nodes }) => {
    return (
        <Menu>
            <MenuLabel>Charts</MenuLabel>
            <MenuList>
                <li><MenuLink href="#/stats/piechart">Line chart</MenuLink></li>
                <li><MenuLink href="#/stats/piechart">Bar chart</MenuLink></li>
            </MenuList>
            <MenuLabel>Axes</MenuLabel>
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
        return (
            <Index />
        );
    }
}

export default withRouter(connect(null, mapDispatchToProps)(StatsIndex))


