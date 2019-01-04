import React from 'react';
import { connect } from "react-redux";
import { select as selectTest, load as loadComparison } from '../../actions/compareActions'
import { Box } from 'bloomer';
import { Table } from 'bloomer/lib/elements/Table';

const mapStateToProps = state => ({
    comparedTests: state.compare.tests,
});

const mapDispatchToProps = dispatch => ({
    selectTest: id => dispatch(selectTest(id)),
    loadComparison: () => dispatch(loadComparison())
});

const SelectedTests = ({ comparedTests }) => {
    console.log(comparedTests);

    return (
        <Box>
            <Table isFullwidth isBordered>
                <thead>
                    <tr>
                        <th>Test number</th>
                        <th>Test name</th>
                        <th>All threads</th>
                        <th>Request count</th>
                        <th>Time elapsed</th>
                        <th>Average response time per request [ms]</th>
                    </tr>
                </thead>
                <tbody>
                    {comparedTests.map((test, index) =>
                        <tr>
                            <td>{index}</td>
                            <td>{test._doc.name}</td>
                            <td>6846</td>
                        </tr>)}
                </tbody>
            </Table>
        </Box>
    )
}

const CompareTests = connect(mapStateToProps)(SelectedTests)

export default CompareTests