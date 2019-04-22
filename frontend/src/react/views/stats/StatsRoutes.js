import React from 'react';
import { Switch, Route, withRouter } from "react-router-dom";
import Summary from "./Summary";
import SuccesRate from './SuccessRate'
import ResponseTimeOverview from './ResponseTimeOverview'
import posed, { PoseGroup } from 'react-pose';
import ActiveThreadsOverTime from './ActiveThreadsOverTime';
import StatisticalData from './StatisticalData';

const RoutesContainer = posed.div({
  enter: {
    opacity: 1,
  },
  exit: {
    opacity: 0
  }
})

const StatsRoutes = ({ location }) => {
  return (
    <PoseGroup>
      <RoutesContainer key={location.pathname}>
        <Switch location={location}>
          <Route exact path="/stats/:testId" component={Summary} />
          <Route exact path="/stats/:testId/succesrate" component={SuccesRate} />
          <Route exact path="/stats/:testId/stats" component={StatisticalData} />
          <Route exact path="/stats/:testId/responsetimeoverview" component={ResponseTimeOverview} />
          <Route exact path="/stats/:testId/activethreadsovertime" component={ActiveThreadsOverTime} />
        </Switch>
      </RoutesContainer>
    </PoseGroup>
  )
}

export default withRouter(StatsRoutes)