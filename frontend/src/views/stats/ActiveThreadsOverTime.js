import React from 'react';
import { Line } from 'react-chartjs-2';
import { Box, Title, Columns, Column } from 'bloomer'
import { connect } from 'react-redux';

const ResponseTimeOvewrview = ({ loadBenchmark, testData, ...props }) => {
    // const activeThreadsData = calculateActiveThreadsOverTime(testData.testData)
    const labels = [13, 14, 15, 16, 17]
    const data = {
        data: {},
        labels,
    }
    return (
        <Box>
            <Columns isMultiline>
                <Column isSize="full">
                    <Title className="heading">
                        Active threads over time
                    </Title>
                </Column>
                <Column>
                    <Line data={data} />
                </Column>
            </Columns>
        </Box>
    )
}

const mapStateToProps = state => ({
    testData: state.tests.data,
    groupedData: state.tests.groupedData,
    groupedStats: state.tests.groupedStats,
})
export default connect(mapStateToProps)(ResponseTimeOvewrview)

// const myChart = new Chart(ctx, {
//     type: 'line',
//     data: {
//       labels: xData,
//       datasets: [{
//         label: "Unavailable",
//         fill: true,
//         backgroundColor: colors.purple.fill,
//         pointBackgroundColor: colors.purple.stroke,
//         borderColor: colors.purple.stroke,
//         pointHighlightStroke: colors.purple.stroke,
//         borderCapStyle: 'butt',
//         data: unavailable,
//       }, {
//         label: "Available for Existing",
//         fill: true,
//         backgroundColor: colors.darkBlue.fill,
//         pointBackgroundColor: colors.darkBlue.stroke,
//         borderColor: colors.darkBlue.stroke,
//         pointHighlightStroke: colors.darkBlue.stroke,
//         borderCapStyle: 'butt',
//         data: availableForExisting,
//       }, {
//         label: "Available",
//         fill: true,
//         backgroundColor: colors.green.fill,
//         pointBackgroundColor: colors.lightBlue.stroke,
//         borderColor: colors.lightBlue.stroke,
//         pointHighlightStroke: colors.lightBlue.stroke,
//         borderCapStyle: 'butt',
//         data: available,
//       }, {
//         label: "Logged In",
//         fill: true,
//         backgroundColor: colors.green.fill,
//         pointBackgroundColor: colors.green.stroke,
//         borderColor: colors.green.stroke,
//         pointHighlightStroke: colors.green.stroke,
//         data: loggedIn,
//       }]
//     },
//     options: {
//       responsive: false,
//       // Can't just just `stacked: true` like the docs say
//       scales: {
//         yAxes: [{
//           stacked: true,
//         }]
//       },
//       animation: {
//         duration: 750,
//       },
//     }
//   });