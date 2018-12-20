import React from 'react';
import { Doughnut, } from 'react-chartjs-2';
import { Box, Button, Title } from 'bloomer'
import { connect } from 'react-redux';
import {load as loadBenchmark} from '../../actions/benchmarkDataActions'

const PieCharts = ({ data, loadBenchmark }) => (
    <Box>
        <Button isSize="small" isColor="primary" className="is-rounded" onClick={loadBenchmark} >
        Load
        </Button>
        <Title className="heading">
            PieCharts
        </Title>
        <Doughnut data={data} />
    </Box>
)


const mapStateToProps = state => ({
    data: state.benchmarkData.data
})

const mapDispatchToProps = dispatch => ({
    loadBenchmark: () => dispatch(loadBenchmark())
})


export default connect(mapStateToProps, mapDispatchToProps)(PieCharts)

