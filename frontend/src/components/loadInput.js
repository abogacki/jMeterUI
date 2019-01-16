import React from 'react';
import { load as loadBenchmark } from '../actions/benchmarkDataActions';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux'

const mapDispatchToProps = dispatch => ({
    loadBenchmark: (csv, history) => dispatch(loadBenchmark(csv, history))
})

const handleUpload = async ({loadBenchmark, history} , e) => {
    const file = await e.target.files[0];
    const reader = new FileReader();
    console.log(history, ';history');
    
    try {
        await reader.readAsText(file, "UTF-8");
        // create object with filename etc
        reader.onload = (e) => loadBenchmark({
            name: file.name,
            data: e.target.result
        }, history);
    } catch (error) {
        reader.onerror = e => alert("Error reading file")
    }
}

const LoaderInput = ({...props}) => (
    <React.Fragment>
        <label htmlFor="uploadBenchmark" className="button is-rounded">Upload</label>
        <input id="uploadBenchmark" type="file" accept=".csv" className="is-hidden" onChange={handleUpload.bind(null, {...props})} />
    </React.Fragment>
)

export default withRouter(connect(null, mapDispatchToProps)(LoaderInput))