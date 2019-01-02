import React from 'react';
import { connect } from 'react-redux';
import TestSelector from '../components/comparisonComponents/TestSelector'

const Comparison = props => {
    
    return (
    <div className="container">
        <div className="tab-pane is-active" id="pane-2">
            <div className="content">
                <TestSelector />
            </div>
        </div>
    </div>
)}

const mapStateToProps = state => ({ 
    selectedTests: state.compare.tests
});


export default connect(mapStateToProps)(Comparison)
