import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Title, Columns, Column, Panel, PanelBlock, PanelHeading } from 'bloomer'
import { connect } from 'react-redux';

const convertData = data => {
    if (data && data.length) {
        const requestsUnder500ms = data.filter(r => r.elapsed <= 500 && r.elapsed > 0).length
        const requestsUnder1500ms = data.filter(r => r.elapsed > 500 && r.elapsed <= 1500).length
        const requestsOver1500ms = data.filter(r => r.elapsed > 1500).length
        const requestErrors = data.filter(r => !r.success).length;
        const calcData = [requestsUnder500ms, requestsUnder1500ms, requestsOver1500ms, requestErrors]
        const labels = [
            'Requests having response time <= 500ms',
            'Requests having response time > 500ms and <=1500ms',
            'Requests having response time > 1500ms',
            'Requests in error',
        ]
        return {
            labels,
            datasets: [{
                label: "Requests count: ",
                backgroundColor: ["lightgreen", "yellow", "sandybrown", "tomato"],
                data: calcData
            }]
        }

    }
}

const ResponseTimeOvewrview = ({ loadBenchmark, testData }) => {
    const convertedData = convertData(testData);
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

                            {convertedData && <Bar
                                options={{ legend: { display: false } }}
                                data={
                                    convertedData
                                } />}
                        </PanelBlock>
                    </Panel>
                </Column>
            </Columns>
        </div>
    )
}

const mapStateToProps = state => ({
    ...state.benchmark.test.data,
})
export default connect(mapStateToProps)(ResponseTimeOvewrview)

