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
            <Table isBordered>
                <thead>
                    <tr>
                        <th>Test number</th>
                        <th>Test name</th>
                        <th>Request count</th>
                        <th>All threads</th>
                        <th>Time elapsed [s]</th>
                        <th>Average response time per request [s]</th>
                    </tr>
                </thead>
                <tbody>
                    {comparedTests.map((test, index) => {
                        const beginTimeStamp = Number(test.testData[0].timeStamp);
                        const beginDate = new Date(beginTimeStamp);
                        const endTimeStamp = Number(test.testData.slice(-1)[0].timeStamp);
                        const endDate = new Date(endTimeStamp);
                        const elapsed = Math.floor((endDate.getTime() - beginDate.getTime()) / 1000);
                        const reqCount = test.testData.length;
                        const avg = Math.floor((elapsed/reqCount)*100)/100;
                        return <tr key={index}>
                            <td>{index}</td>
                            <td>{test._doc.name}</td>
                            <td>{reqCount}</td>
                            <td>{test.testData[0].allThreads}</td>
                            <td>{elapsed}</td>
                            <td>{avg}</td>
                        </tr>})}
                </tbody>
            </Table>
        </Box>
    )
}

const CompareTests = connect(mapStateToProps)(SelectedTests)

export default CompareTests