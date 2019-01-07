import React, { Component } from 'react';
import TestSelector from '../components/comparisonComponents/TestSelector'
import { list as getTestList } from '../actions/benchmarkDataActions';
import { connect } from "react-redux";

class Compare extends Component {
    componentWillMount(){
        this.props.getTestList()
    }
    render() {
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
}

export default connect(null, dispatch => ({
    getTestList: () => dispatch(getTestList())
}))(Compare)
