import React from 'react';
import TestSelector from '../components/comparisonComponents/TestSelector'

const Compare = props => {
    return (
        <div className="container">
            <div className="tab-pane is-active" id="pane-2">
                <div className="content">
                    <TestSelector />
                </div>
            </div>
        </div>
    )
}

export default Compare
