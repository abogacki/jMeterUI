import React from 'react';
import { Line } from 'react-chartjs-2';
import { Box, Title, Columns, Column } from 'bloomer'
import { connect } from 'react-redux';

const ResponseTimeOvewrview = () => {
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
  testData: state.benchmarks.test.data,
  groupedData: state.benchmarks.test.groupedData,
  groupedStats: state.benchmarks.test.groupedStats,
})

export default connect(mapStateToProps)(ResponseTimeOvewrview)