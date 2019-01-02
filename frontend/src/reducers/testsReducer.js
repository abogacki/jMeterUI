import statsLite from 'stats-lite';

const initialState = {
    list: [],
    data: {
        testData: []
    },
    groupedData: {},
    groupedStats: [],
    isLoading: false
}


const testReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LIST_TESTS_SUCCESS":
            return { ...state, list: action.payload.test }
        case "LOAD_TESTDETAILS_BEGIN":
            return { ...state, isLoading: true }
        case "LOAD_TESTDETAILS_SUCCESS":
            const groupedData = groupData(action.payload.testData);
            const groupedStats = calcStats(groupedData);
            return { ...state, data: action.payload, groupedData, groupedStats, isLoading: false }
        case "COMPARE_SELECT":
            const selectedTests = state.list.map(t =>
                (t._id === action.payload)
                    ? ({ ...t, isSelected: !t.isSelected })
                    : { ...t })
            return { ...state, list: selectedTests }
        default:
            return { ...state }
    }
}

export default testReducer

const groupData = testData => {
    const labelTypes = [];
    let groupedData = {};

    testData.forEach(row => {
        const fixedLabel = row.label.replace(/-.*/, '').trim();
        if (!labelTypes.includes(fixedLabel)) {
            labelTypes.push(fixedLabel)
            groupedData[fixedLabel] = [];
        }
        groupedData[fixedLabel].push({ ...row, groupLabel: fixedLabel })
    });
    return groupedData;
}

const calcStats = (groupedData) => {
    let transformedGroups = {};
    if (groupedData) {
        Object.keys(groupedData).forEach(groupName => {
            transformedGroups[groupName] = [];
            groupedData[groupName].forEach(request => {
                transformedGroups[groupName].push(request.elapsed)
            })
        });
    }

    const stats = Object.keys(transformedGroups).map(groupName => ({
        groupName,
        sum: Math.round(statsLite.sum(transformedGroups[groupName]) * 100) / 100,
        mean: Math.round(statsLite.mean(transformedGroups[groupName]) * 100) / 100,
        median: Math.round(statsLite.median(transformedGroups[groupName]) * 100) / 100,
        mode: Math.round(statsLite.mode(transformedGroups[groupName]) * 100) / 100,
        variance: Math.round(statsLite.variance(transformedGroups[groupName]) * 100) / 100,
        standardDeviation: Math.round(statsLite.stdev(transformedGroups[groupName]) * 100) / 100,
        sampleStandardDeviation: Math.round(statsLite.sampleStdev(transformedGroups[groupName]) * 100) / 100,
        percentile: Math.round(statsLite.percentile(transformedGroups[groupName], 0.85) * 100) / 100,
        histogram: Math.round(statsLite.histogram(transformedGroups[groupName], 10) * 100) / 100
    }));

    return stats
}