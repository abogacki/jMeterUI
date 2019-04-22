import React from 'react';
import { createFromFile as createBenchmarkFromFile } from '../redux/benchmarks/index';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

const loadjMeterCsv = (callback = () => null) => async (e) => {
  const file = await e.target.files[0];
  const reader = new FileReader();

  try {

    await reader.readAsText(file, "UTF-8");

    reader.onload = (e) => callback({
      name: file.name,
      data: e.target.result
    })

  } catch (error) {

    reader.onerror = () => console.error("Error reading file")

  }
}

const mapDispatchToProps = dispatch => ({
  createBenchmarkFromFile: csv => dispatch(createBenchmarkFromFile(csv))
})

const LoaderInput = ({ createBenchmarkFromFile }) => (
  <>
    <label htmlFor="uploadBenchmark" className="button is-rounded">Upload</label>
    <input id="uploadBenchmark" type="file" accept=".csv" className="is-hidden" onChange={loadjMeterCsv(createBenchmarkFromFile)} />
  </>
)

export default withRouter(connect(null, mapDispatchToProps)(LoaderInput))