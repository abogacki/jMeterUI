import React from 'react';
import { defaults } from 'react-chartjs-2';
import { Box, Title, Columns, Column, Table } from 'bloomer'
import { connect } from 'react-redux';

defaults.global.defaultFontFamily = "'Oxygen', sans-serif";

const mapStateToProps = state => ({
    ...state.tests.data,
})

const Summary = ({ testData }) => {
    return (
        <Box>
            <Title className="heading">
                Summary
            </Title>
            <Columns hasTextAlign="centered">
                <Column>
                    {testData && testData.length > 0 && renderTable(testData)}
                </Column>
            </Columns>
        </Box>
    )
}

export default connect(mapStateToProps)(Summary)

const renderTable = data => {
    const columns = Object.keys(data[0]);

    const groupedData = groupData(data);

    const calculatedAvgs = calcAvgs(groupedData);
        
    const rows = Object.keys(groupedData).map(group => {

       
        return {
            label: groupedData[group][0].label,
            groupLabel: groupedData[group][0].groupLabel,
            samples: groupedData[group].length,
            ...calculatedAvgs[group]
        }
    })
    
    console.log(rows);
    
    // console.log(labelTypes);
    const Row = ({ data }) => <tr>
        <td>{data.groupLabel}</td>
        <td>{data.samples}</td>
        <td>0%</td>
        <td>{data.elapsed}</td>
        <td>{data.bytes}</td>
    </tr>
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
                {rows.map((r, index) => <Row key={index} data={r} />)}
            </tbody>
        </Table>
    )
}

const groupData = testData => {
    const labelTypes = [];
    let groupedData = {};

    testData.forEach(row => {
        const fixedLabel = row.label.replace(/-.*/, '').trim();
        if (!labelTypes.includes(fixedLabel)) {
            labelTypes.push(fixedLabel)
            groupedData[fixedLabel] = [];
        }
        groupedData[fixedLabel].push({ ...row, groupLabel: fixedLabel })
    });
    return groupedData;
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
            Object.assign(acc, { [name]: values.reduce( (a,b) => a+b ) / values.length }),
        {}
    );

    const avgs = {}
    groups.forEach(group => avgs[group] = avg(groupedData[group]))
    return avgs
}