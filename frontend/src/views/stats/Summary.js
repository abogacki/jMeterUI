import React from 'react';
import { Doughnut, } from 'react-chartjs-2';
import { Box, Title, Columns, Column, Table } from 'bloomer'
import { connect } from 'react-redux';

const convertData = data => {
    if (data) {
        const successfullRequests = data.filter(r => r.success === "true");
        const errorRequests = data.filter(r => r.success !== "true");
        const desiredDataModel = {
            datasets: [{
                data: [errorRequests.length, successfullRequests.length,],
                backgroundColor: ['red', 'green']
            }],

            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: ['Error', 'Success'],
        };
        return desiredDataModel
    }
}

const mapStateToProps = state => ({
    data: state.benchmarkData.data
})

const Summary = ({ data }) => {
    let convertedData = {}
    if (data) {
        // convertedData = convertData(data);
    }
    return (
        <Box>
            <Title className="heading">
                Summary
            </Title>
            <Columns>
                <Column>
                    {/* {data && renderTable(data)} */}
                </Column>
            </Columns>
            <Columns>
                <Column>
                    {/* {data && <Doughnut data={convertedData} />} */}
                </Column>
            </Columns>
        </Box>
    )
}

export default connect(mapStateToProps)(Summary)

const renderTable = data => {
    const columns = Object.keys(data[0]);
    const labelTypes = [];
    data.forEach(row => {
        if (!labelTypes.includes(row['label'])) {
            labelTypes.push(row['label'])
        } 
    } );
    return (
        <Table >
            <thead>
                <tr>
                    <th>Label</th>
                    <th>Samples</th>
                    <th>KO</th>
                    <th>Average</th>
                    <th>Min</th>
                    <th>Max</th>
                    <th>Throughput</th>
                    <th>Received (KB/s)</th>
                    <th>Sent (KB/s)</th>
                </tr>
            </thead>
            <tbody>
                {/* {data.map(r => <tr>{row(r)}</tr>)} */}
            </tbody>
        </Table>
    )
}