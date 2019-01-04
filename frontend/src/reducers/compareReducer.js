const initialState = {
    tests: []
}

const compareReducer = (state= initialState, action) => {
    switch (action.type) {
        case "COMPARE_LOAD_SUCCESS":
            console.log(action.payload, 'success');
            return {...state, tests: action.payload};
        case "COMPARE_RESET":
            return {...state, tests: []}    
        default:
            return {...state};
    }
}

export default compareReducer