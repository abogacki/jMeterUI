import React from 'react';
import { load as loadBenchmark } from '../actions/benchmarkDataActions';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux'

const mapDispatchToProps = dispatch => ({
    loadBenchmark: (csv) => dispatch(loadBenchmark(csv))
})

const handleUpload = async ({loadBenchmark, history }, e) => {
    const file = await e.target.files[0];
    const reader = new FileReader();
    try {
        await reader.readAsText(file, "UTF-8");
        // create object with filename etc
        reader.onload = (e) => loadBenchmark({
            sourceFile: 'somefile.csv',
            data: e.target.result
        })
        await history.push('/stats')

    } catch (error) {
        reader.onerror = e => alert("Error reading file")
    }
}

const LoaderInput = props => (
    <React.Fragment>
        <label htmlFor="uploadBenchmark" className="button is-rounded">Upload</label>
        <input id="uploadBenchmark" type="file" accept=".csv" className="is-hidden" onChange={handleUpload.bind(null, {...props})} />
    </React.Fragment>
)

export default withRouter(connect(null, mapDispatchToProps)(LoaderInput))