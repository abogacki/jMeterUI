import React from 'react';
import { Route } from "react-router-dom";
import Index from '../views/home'
import About from '../views/about'
import Stats from '../views/stats/Stats'

export default props => {
    return (
        <div>
            <Route path="/" exact component={Index} />
            <Route path="/about/" component={About} />
            <Route path="/stats/" component={Stats.Index} />
        </div>
    )
}