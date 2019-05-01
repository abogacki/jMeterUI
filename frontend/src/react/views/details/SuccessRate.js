import React from 'react';
import { Doughnut, } from 'react-chartjs-2';
import { Title, Columns, Column, Panel, PanelHeading, PanelBlock } from 'bloomer'
import { connect } from 'react-redux';

const convertData = data => {
  const successfullRequests = data.filter(r => r.success);
  const errorRequests = data.filter(r => !r.success);
  const desiredDataModel = {
    datasets: [{
      data: [errorRequests.length, successfullRequests.length,],
      backgroundColor: ['red', 'green']
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: ['Error', 'Success'],
    options: {
      legend: {
        position: 'right'
      }
    }
  };
  return desiredDataModel
}

const PieCharts = ({ data, loadBenchmark }) => {
  const convertedData = data ? convertData(data) : null;
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
            {data && <Doughnut data={convertedData} />}
          </PanelBlock>
        </Panel>
      </Column>
    </Columns>
  )
}

const mapStateToProps = state => ({
  data: state.benchmarks.test.data.testData,
})
export default connect(mapStateToProps)(PieCharts)
