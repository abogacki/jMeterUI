const initialState = {
    tests: []
}

const compareReducer = (state= initialState, action) => {
    switch (action.payload) {
        case "LOAD_COMPARISON_SUCCESS":
            return {...state};    
        default:
            return {...state};
    }
}

export default compareReducer