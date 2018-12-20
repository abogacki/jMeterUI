import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";    
import PieCharts from './PieCharts'

const StatsRoutes = props => (
    <React.Fragment>
        <Router>
            <div>
                <Route path="/stats/piechart" component={PieCharts} />
            </div>
        </Router>
    </React.Fragment>
)

const Index = props => <h2 className="heading">Index</h2>
// const PieCharts = props => <h2 className="heading">PieCharts</h2>

export default StatsRoutes