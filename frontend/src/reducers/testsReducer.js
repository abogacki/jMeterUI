const initialState = {
    data: {
        testData: []
    }
}

const testReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LIST_TESTS_SUCCESS":
            return {...state, list: action.payload.test}
        case "LOAD_TESTDETAILS_SUCCESS":
            return {...state, data: action.payload}
        default:
            return {...state}
    }
}

export default testReducer