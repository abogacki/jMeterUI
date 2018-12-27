import React from 'react';
import { Doughnut, } from 'react-chartjs-2';
import { Box, Title, Columns, Column, Table } from 'bloomer'
import { connect } from 'react-redux';

const convertData = data => {

    if (data) {

        const successfullRequests = data.filter(r => r.success === "true");
        const errorRequests = data.filter(r => r.success !== "true");

        console.log();
        
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

const Summary = ({ data }) => {
    const convertedData = convertData(data);
    
    if (data && data[0]) console.log(data[0]);
    if (data && data[0]) console.log(data[1]);
    
    return (
        <Box>
            <Title className="heading">
                Summary
            </Title>
            <Columns>
                <Column>
                    {data && renderTable(data)}
                </Column>
            </Columns>
            <Columns>
                <Column>
                    {data && <Doughnut data={convertedData} />}
                </Column>
            </Columns>
        </Box>
    )
}


const mapStateToProps = state => ({
    data: state.benchmarkData.data
})

export default connect(mapStateToProps)(Summary)

