import React from 'react';
import { Switch, Route, withRouter } from "react-router-dom";
import Info from "./Info";
import Summary from "./Summary";
import SuccesRate from './SuccessRate'
import ResponseTimeOverview from './ResponseTimeOverview'
import posed, { PoseGroup } from 'react-pose';

const RoutesContainer = posed.div({
    enter: {
        opacity: 1,
    },
    exit: {
        opacity: 0
    }
})

const StatsRoutes = ({ location }) => {
    console.log(location);
    
    return (
    <PoseGroup>
        <RoutesContainer key={location.pathname}>
            <Switch location={location}>
                <Route exact path="/stats/:testId" component={Summary} />
                <Route exact path="/stats/:testId/info" component={Info} />
                <Route exact path="/stats/:testId/succesrate" component={SuccesRate} />
                <Route exact path="/stats/:testId/responsetimeoverview" component={ResponseTimeOverview} />
            </Switch>
        </RoutesContainer>
    </PoseGroup>
)}

export default withRouter(StatsRoutes)