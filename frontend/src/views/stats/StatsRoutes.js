import React from 'react';
import { Switch, Route, withRouter } from "react-router-dom";    
import PieCharts from './PieCharts'
import Summary from "./Summary";

const StatsRoutes = ({location}) => (
    <React.Fragment>
        <Switch location={location}>
                <Route exact path="/stats/:testId" component={Summary} />
                <Route exact path="/stats/:testId/piechart/" component={PieCharts} />
        </Switch>
    </React.Fragment>
)

export default withRouter(StatsRoutes)