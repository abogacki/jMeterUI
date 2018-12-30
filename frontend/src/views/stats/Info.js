import React from 'react';
import { defaults } from 'react-chartjs-2';
import { Box, Title } from 'bloomer'
import { connect } from 'react-redux';

defaults.global.defaultFontFamily = "'Oxygen', sans-serif";

const mapStateToProps = state => ({
    ...state.tests.data,
})

const Info = ({ testData, ...props }) => {
    console.log(props);
    const convertDate = (date) => {
        const d = new Date(date)
        return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`
        };
    const date = convertDate(props._doc.createdAt)
    return (
        <Box>
            <Title className="heading">
                Info
            </Title>
            <h4><strong>Test name:</strong> {props._doc.name}</h4>
            <h4><strong>Test id: </strong> {props._doc._id}</h4>
            <h4><strong>Uploaded at: </strong> {date}</h4>
            <h4><strong>Requests samples count: </strong> {testData.length}</h4>
        </Box>
    )
}

export default connect(mapStateToProps)(Info)