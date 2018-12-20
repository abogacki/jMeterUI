const initialState = {
    data: {
        datasets: [],
        labels: []
    }
}

const LOAD_BENCHMARK = 'LOAD_BENCHMARK';

const benchmarkDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_BENCHMARK:
            return {...state, data: action.payload};
        default:
            return state;
    }
}

export default benchmarkDataReducer