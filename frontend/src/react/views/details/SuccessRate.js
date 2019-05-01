import React from 'react';
import { Doughnut, } from 'react-chartjs-2';
import { Title, Columns, Column, Panel, PanelHeading, PanelBlock } from 'bloomer'
import { connect } from 'react-redux';
import {
  getSuccessfullRequests,
  getUnsuccessfullRequests,
} from '../../../redux/details/selectors'

const SuccessRate = ({ successfullRequests, unsuccessfullRequets }) => {
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

const mapStateToProps = state => ({
  successfullRequests: getSuccessfullRequests(state),
  unsuccessfullRequets: getUnsuccessfullRequests(state),
})

export default connect(mapStateToProps)(SuccessRate)

