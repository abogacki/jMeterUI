import React from 'react';
import { Doughnut, } from 'react-chartjs-2';
import { Box, Title } from 'bloomer'
import { connect } from 'react-redux';

// const desiredDataModel = {
//     labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//     datasets: [{
//         label: '# of Votes',
//         data: [12, 19, 3, 5, 2, 3],
//         backgroundColor: [
//             'red', 'blue', 'yellow', 'green', 'purple', 'orange'
//         ],
//         hoverBackgroundColor: ['red', 'blue', 'yellow', 'green', 'purple', 'orange'],
//         borderWidth: 1
//     }]
// }

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

