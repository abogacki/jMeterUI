import axios from 'axios';

export const select = id => async (dispatch, getState) => {
    console.log(id);
    dispatch({type: 'COMPARE_SELECT', payload: id})
} 


export const load = () => async (dispatch, getState) => {

    const selectedTests = getState().tests.list.filter(t => t.isSelected);
    const testIds = selectedTests.map(test => test._id);

    const onSuccess = response => {
        console.log('response.data', response.data);
    }

    try {
        dispatch({ type: 'COMPARE_LOAD_BEGIN'});
    
        const url = `/test/detailList`
        const baseURL = 'http://localhost:8080/api'
        const params = {
            testIds: JSON.stringify(testIds)
        }
        //
        const testDetails = await axios({ method: 'get', baseURL, url, params });        
        // 
        onSuccess(testDetails);
    
    } catch (error) {
     
        console.log(error);
        alert(error.message)
    
    }
}
