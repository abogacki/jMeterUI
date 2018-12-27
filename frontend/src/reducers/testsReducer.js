const initialState = {}

const testReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LIST_TESTS_SUCCESS":
            console.log(action.payload);
            return {...state, list: action.payload.test}
        default:
            return {...state}
    }
}

export default testReducer