import React from 'react';
import { Doughnut, } from 'react-chartjs-2';
import { Title, Columns, Column, Panel, PanelHeading, PanelBlock } from 'bloomer'
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

const getTestData = state => state.details.testData
const getSuccessfullRequests = createSelector([getTestData], data => data.filter(r => r.success))
const getUnsuccessfullRequests = createSelector([getTestData], data => data.filter(r => !r.success))

const mapStateToProps = state => ({
  successfullRequests: getSuccessfullRequests(state),
  unsuccessfullRequets: getUnsuccessfullRequests(state),
})

const PieCharts = ({ successfullRequests, unsuccessfullRequets }) => {
  const chartData = {
    datasets: [{
      data: [unsuccessfullRequets.length, successfullRequests.length,],
      backgroundColor: ['red', 'green']
    }],
    labels: ['Error', 'Success'],
    options: {
      legend: {
        position: 'right'
      }
    }
  }
  return (
    <Columns isMultiline>
      <Column isSize="full">
        <Title className="heading">
          Request success rate
        </Title>
      </Column>
      <Column>
        <Panel>
          <PanelHeading>
            Request success rate
          </PanelHeading>
          <PanelBlock className="notification is-white">
            <Doughnut data={chartData} />
          </PanelBlock>
        </Panel>
      </Column>
    </Columns>
  )
}

export default connect(mapStateToProps)(PieCharts)

