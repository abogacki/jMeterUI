import React from 'react';
import { load as loadBenchmark } from '../actions/benchmarkDataActions'
import { connect } from 'react-redux'

const mapDispatchToProps = dispatch => ({
    loadBenchmark: (csv) => dispatch(loadBenchmark(csv))
})

const handleUpload = async (onLoad, e) => {
    const file = await e.target.files[0];
    const reader = new FileReader();
    try {
        await reader.readAsText(file, "UTF-8");
        // create object with filename etc
        reader.onload = (e) => onLoad({
            sourceFile: 'somefile.csv',
            data: e.target.result
        })

    } catch (error) {
        reader.onerror = e => alert("Error reading file")
    }
}

const LoaderInput = props => (
    <React.Fragment>
        <label htmlFor="uploadBenchmark" className="button is-rounded">Upload</label>
        <input id="uploadBenchmark" type="file" accept=".csv" className="is-hidden" onChange={handleUpload.bind(null, props.loadBenchmark)} />
    </React.Fragment>
)

export default connect(null, mapDispatchToProps)(LoaderInput)