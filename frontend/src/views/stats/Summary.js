import React from 'react';
import { defaults } from 'react-chartjs-2';
import { Title, Columns, Column, Table, Box, LevelItem, Level } from 'bloomer'
import { connect } from 'react-redux';
import statsLite from 'stats-lite';
import Info from './Info'

defaults.global.defaultFontFamily = "'Oxygen', sans-serif";

const mapStateToProps = state => ({
    testData: state.tests.data.testData
})

const SummaryFunc = ({ groupedData }) => {
    return (
        <LevelItem>
            <Title className="heading">
                Summary
            </Title>
            <Columns hasTextAlign="centered">
                <Column>
                    {groupedData && <SummaryTable data={groupedData} />}
                </Column>
            </Columns>
        </LevelItem>
    )
}

const OverallStats = ({ testData }) => {
    const values = testData.map(r => r.elapsed);

    const statistics = {
        // sum: Math.round(statsLite.sum(values) * 100) / 100,
        mean: Math.round(statsLite.mean(values) * 100) / 100,
        median: Math.round(statsLite.median(values) * 100) / 100,
        mode: statsLite.mode(values),
        // variance: Math.round(statsLite.variance(values) * 100) / 100,
        standardDeviation: Math.round(statsLite.stdev(values) * 100) / 100,
        // sampleStandardDeviation: Math.round(statsLite.sampleStdev(values) * 100) / 100,
        '85thpercentile': Math.round(statsLite.percentile(values, 0.85) * 100) / 100,
        '90thpercentile': Math.round(statsLite.percentile(values, 0.90) * 100) / 100,
        '90thpercentile': Math.round(statsLite.percentile(values, 0.90) * 100) / 100,
        '95thpercentile': Math.round(statsLite.percentile(values, 0.95) * 100) / 100,
        // histogram: Math.round(statsLite.histogram(values, 10) * 100) / 100
    }

    return (
        <React.Fragment>
        <Title className="heading">
            Overall statistics
        </Title>
        <Box className="notification is-danger">
            <Columns>
                {Object.keys(statistics).map(stat => 
                <Column>
                    <div>
                        <div className="heading">{stat} [s]</div>
                        <Title isSize={5}>
                            {statistics[stat]} 
                        </Title>
                    </div>
                </Column>)}
            </Columns>
        </Box>
        </React.Fragment>
    )
}

const Summary = connect(mapStateToProps)(OverallStats)


const SummaryTable = ({ data }) => {
    const calculatedAvgs = calcAvgs(data);

    const rows = Object.keys(data).map(group => ({
        label: data[group][0].label,
        groupLabel: data[group][0].groupLabel,
        samples: data[group].length,
        ...calculatedAvgs[group]
    }))

    const Row = ({ rowData }) => (<tr>
        <td>{rowData.groupLabel}</td>
        <td>{rowData.samples}</td>
        <td>0%</td>
        <td>{rowData.elapsed}</td>
        <td>{rowData.bytes}</td>
    </tr>)

    return (
        <Table isBordered className='is-hoverable is-fullwidth'>
            <thead>
                <tr>
                    <th>Request Label</th>
                    <th>Samples</th>
                    <th>KO</th>
                    <th>Average time elapsed (ms)</th>
                    <th>Average bytes</th>
                </tr>
            </thead>
            <tbody>
                {rows.map((r, index) => <Row key={index} rowData={r} />)}
            </tbody>
        </Table>
    )
}

const calcAvgs = groupedData => {
    const groups = Object.keys(groupedData);
    const avg = data => Array.from(data.reduce(
        (acc, obj) => Object.keys(obj).reduce(
            (acc, key) => typeof obj[key] == "number"
                ? acc.set(key, (acc.get(key) || []).concat(obj[key]))
                : acc,
            acc),
        new Map())).reduce(
            (acc, [name, values]) =>
                Object.assign(acc, { [name]: values.reduce((a, b) => a + b) / values.length }),
            {}
        );

    const avgs = {}
    groups.forEach(group => avgs[group] = avg(groupedData[group]))
    return avgs
}

export default props => (
    <React.Fragment>
        <Info />
        <Summary />
    </React.Fragment>
)