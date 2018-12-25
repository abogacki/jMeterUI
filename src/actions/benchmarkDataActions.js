import {csvTojs} from '../helpers/csvTojs'

export const load = ({data}) => dispatch => {
    // console.log(data);
    const converted = csvTojs(data);
    const payload = { sourceFile: 'test.csv', data: converted}
    dispatch({type: 'LOAD_BENCHMARK', payload })
}

