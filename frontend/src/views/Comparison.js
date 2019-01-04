import React from 'react';
import ComparedTests from '../components/comparisonComponents/ComparedTests'

const Compare = props => {
    return (
        <div className="container">
            <div className="tab-pane is-active" id="pane-2">
                <div className="content">
                    <ComparedTests />
                </div>
            </div>
        </div>
    )
}

export default Compare
