import React from 'react';
import { connect } from 'react-redux';
import { Box, Title, Table, Columns, Column } from 'bloomer';

const StatisticalData = ({ groupedData, groupedStats }) => {
    // const calculatedStats = transformedGroups ? Object.keys(transformedGroups).map(groupName => calcStats(groupName, transformedGroups[groupName])) : null
    return (
        <Box>
            <Title className="heading">
                Basic stats
        </Title>
            <Columns>
                <Column style={{ overflowX: 'auto' }}>
                    <Table isBordered className="is-hoverable">
                        <thead>
                            <tr>
                                <th>Group label</th>
                                <th>Sum [ms]</th>
                                <th>Average [ms]</th>
                                <th>Median [ms]</th>
                                <th>Mode </th>
                                <th>Variance</th>
                                <th>Standard Deviation</th>
                                <th>85th percentile</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groupedStats && groupedStats.length > 0 && groupedStats.map((stat, index) => <Row key={index} data={stat} />)}
                        </tbody>
                    </Table>
                </Column>
            </Columns>
        </Box>
    )
};

const Row = ({ data }) => {
    return (
        <tr>
            <td>{printStringOrArray(data.groupName)}</td>
            <td>{printStringOrArray(data.sum)}</td>
            <td>{printStringOrArray(data.mean)}</td>
            <td>{printStringOrArray(data.median)}</td>
            <td>{data.mode.length > 3 ? 'N/A' : printStringOrArray(data.mode)}</td>
            <td>{printStringOrArray(data.variance)}</td>
            <td>{printStringOrArray(data.standardDeviation)}</td>
            <td>{printStringOrArray(data.percentile)}</td>
        </tr>
    )
}

const printStringOrArray = data => {
    if (typeof(data) == "object") {
        return data.join(', ')
    } else {
        return data
    }
}

const mapStateToProps = state => ({
    groupedData: state.tests.groupedData,
    groupedStats: state.tests.groupedStats
})

export default connect(mapStateToProps)(StatisticalData)