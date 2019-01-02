import React from 'react';
import { defaults } from 'react-chartjs-2';
import { Box, Title, Columns, Column, Table } from 'bloomer'
import { connect } from 'react-redux';
import Info from './Info'

defaults.global.defaultFontFamily = "'Oxygen', sans-serif";

const mapStateToProps = state => ({
    groupedData: state.tests.groupedData
})

const SummaryFunc = ({ groupedData }) => {
    return (
        <Box>
            <Title className="heading">
                Summary
            </Title>
            <Columns hasTextAlign="centered">
                <Column>
                    {groupedData && <SummaryTable data={groupedData} />}
                </Column>
            </Columns>
        </Box>
    )
}

const Summary = connect(mapStateToProps)(SummaryFunc)


const SummaryTable = ({data}) => {
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
        <Table className='is-hoverable is-fullwidth'>
            <thead>
                <tr>
                    <th>Label</th>
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
        {/* <Info /> */}
        <Summary />
    </React.Fragment>
)