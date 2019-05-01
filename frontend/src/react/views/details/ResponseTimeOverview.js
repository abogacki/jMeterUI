import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Title, Columns, Column, Panel, PanelBlock, PanelHeading } from 'bloomer'
import { connect } from 'react-redux';
import { 
  getRequestsUnder500msCount,
  getRequestsUnder1500msCount,
  getRequestsOver1500msCount,
  getRequestsErrorsCount 
} from '../../../redux/details/selectors'

// Refactor pending
const ResponseTimeOvewrview = ({ requestsUnder500ms, requestsUnder1500ms, requestsOver1500ms, requestErrors }) => {
  const data = [requestsUnder500ms, requestsUnder1500ms, requestsOver1500ms, requestErrors]  
  const labels = [
    'Requests having response time <= 500ms',
    'Requests having response time > 500ms and <=1500ms',
    'Requests having response time > 1500ms',
    'Requests in error',
  ]
  const chartData = {
    labels,
    datasets: [{
      label: "Requests count: ",
      backgroundColor: ["lightgreen", "yellow", "sandybrown", "tomato"],
      data
    }]
  }
  return (
    <div>
      <Columns isMultiline>
        <Column isSize="full">
          <Title className="heading">
            Response time overview
          </Title>
        </Column>
        <Column>
          <Panel>
            <PanelHeading>
              Response time overview
                        </PanelHeading>
            <PanelBlock className="notification is-white">
              {chartData && <Bar
                options={{ legend: { display: false } }}
                data={
                  chartData
                } />}
            </PanelBlock>
          </Panel>
        </Column>
      </Columns>
    </div>
  )
}

const mapStateToProps = state => ({
  requestsUnder500ms: getRequestsUnder500msCount(state),
  requestsUnder1500ms: getRequestsUnder1500msCount(state),
  requestsOver1500ms: getRequestsOver1500msCount(state),
  requestErrors: getRequestsErrorsCount(state)
})

export default connect(mapStateToProps)(ResponseTimeOvewrview)

