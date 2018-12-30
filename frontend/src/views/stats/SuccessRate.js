import React from 'react';
import { Doughnut, } from 'react-chartjs-2';
import { Box, Title, Columns, Column } from 'bloomer'
import { connect } from 'react-redux';

const convertData = data => {
    if (data) {
        const successfullRequests = data.filter(r => r.success);
        const errorRequests = data.filter(r => !r.success);
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

const PieCharts = ({ data, loadBenchmark }) => {
    const convertedData = convertData(data);
    return (
        <Box>
            <Columns isMultiline>
                <Column isSize="full">
                    <Title className="heading">
                        Request success rate
                    </Title>
                </Column>
                <Column>
                    {data && <Doughnut data={convertedData} />}
                </Column>
            </Columns>
        </Box>
    )
}

const mapStateToProps = state => ({
    data: state.tests.data.testData,
})
export default connect(mapStateToProps)(PieCharts)

