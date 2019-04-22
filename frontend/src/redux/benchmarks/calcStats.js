import statsLite from 'stats-lite';

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
    mode: statsLite.mode(transformedGroups[groupName]),
    variance: Math.round(statsLite.variance(transformedGroups[groupName]) * 100) / 100,
    standardDeviation: Math.round(statsLite.stdev(transformedGroups[groupName]) * 100) / 100,
    sampleStandardDeviation: Math.round(statsLite.sampleStdev(transformedGroups[groupName]) * 100) / 100,
    percentile: Math.round(statsLite.percentile(transformedGroups[groupName], 0.85) * 100) / 100,
    histogram: Math.round(statsLite.histogram(transformedGroups[groupName], 10) * 100) / 100
  }));

  return stats
}


export default calcStats