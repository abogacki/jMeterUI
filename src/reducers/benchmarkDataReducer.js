const initialState = {
    data: undefined
}

const LOAD_BENCHMARK = 'LOAD_BENCHMARK';

const benchmarkDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_BENCHMARK:
            return {...state, ...action.payload};
        default:
            return state;
    }
}

export default benchmarkDataReducer