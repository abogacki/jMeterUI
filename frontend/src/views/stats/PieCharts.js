import React from 'react';
import { Doughnut, } from 'react-chartjs-2';
import { Box, Title } from 'bloomer'
import { connect } from 'react-redux';

const convertData = data => {
    console.log(data);
    
}

const PieCharts = ({ data, loadBenchmark }) => {
    const convertedData = convertData(data);    
    return (
    <Box>
        <Title className="heading">
            Response Time Percentiles Over Time (successful responses)
        </Title>
        <Doughnut data={convertedData} />
    </Box>
)}


const mapStateToProps = state => ({
    data: state.benchmarkData.data
})

export default connect(mapStateToProps)(PieCharts)

