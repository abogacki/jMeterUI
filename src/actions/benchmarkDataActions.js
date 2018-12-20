export const load = () => dispatch => {
    console.log('load');
    
    dispatch({type: 'LOAD_BENCHMARK', payload: generateData()})
}

const generateData = () => ({
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
            'red', 'blue', 'yellow', 'green', 'purple', 'orange'
        ],
        hoverBackgroundColor: ['red', 'blue', 'yellow', 'green', 'purple', 'orange'],
        borderWidth: 1
    }]
})