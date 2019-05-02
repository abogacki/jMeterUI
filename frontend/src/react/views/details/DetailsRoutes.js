import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import posed, { PoseGroup } from "react-pose";
import Summary from "./Summary";
import SuccesRate from "./SuccessRate";
import ResponseTimeOverview from "./ResponseTimeOverview";
import Statistics from "./Statistics";

const RoutesContainer = posed.div({
  enter: {
    opacity: 1
  },
  exit: {
    opacity: 0
  }
});

const StatsRoutes = ({ location }) => {
  return (
    <PoseGroup>
      <RoutesContainer key={location.pathname}>
        <Switch location={location}>
          <Route exact path="/details/:testId" component={Summary} />
          <Route
            exact
            path="/details/:testId/succesrate"
            component={SuccesRate}
          />
          <Route exact path="/details/:testId/details" component={Statistics} />
          <Route
            exact
            path="/details/:testId/responsetimeoverview"
            component={ResponseTimeOverview}
          />
        </Switch>
      </RoutesContainer>
    </PoseGroup>
  );
};

export default withRouter(StatsRoutes);
