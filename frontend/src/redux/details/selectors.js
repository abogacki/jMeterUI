import { createSelector } from "reselect";
import convertTimeStampToDate from "./convertTimeStampStringToDate";
import transformToDecimal from "../../helpers/transformToDecimal";
import statsLite from "stats-lite";

export const getCreatedAt = state => state.details._doc.createdAt;

export const getCreationDate = createSelector(
  [getCreatedAt],
  createdAt => new Date(createdAt)
);

export const getTestName = state => state.details._doc.name;

export const getTestData = state => state.details.testData;

export const getFirstRequestTimeStamp = createSelector(
  [getTestData],
  testData => testData[0].timeStamp
);

export const getLastRequestTimeStamp = createSelector(
  [getTestData],
  testData => testData.slice(-1)[0].timeStamp
);

export const getBeginDate = createSelector(
  [getFirstRequestTimeStamp],
  convertTimeStampToDate
);

export const getEndDate = createSelector(
  [getLastRequestTimeStamp],
  convertTimeStampToDate
);

export const getElapsed = createSelector(
  [getBeginDate, getEndDate],
  (beginDate, endDate) => {
    return Math.floor((endDate.getTime() - beginDate.getTime()) / 1000);
  }
);

export const getThreadNames = createSelector(
  [getTestData],
  testData => {
    const allRequestsThreads = testData.map(r => r.threadName.trim());
    const uniqueThreads = [...new Set(allRequestsThreads)];
    return uniqueThreads;
  }
);

export const getRequestsSamplesCount = createSelector(
  [getTestData],
  testData => testData.length
);

const createFilteredSelectorBasedOnCondition = condition =>
  createSelector(
    [getTestData],
    testData => testData.filter(condition).length
  );

export const getRequestsUnder500msCount = createFilteredSelectorBasedOnCondition(
  value => value.elapsed <= 500 && value.elapsed > 0
);

export const getRequestsUnder1500msCount = createFilteredSelectorBasedOnCondition(
  value => value.elapsed > 500 && value.elapsed <= 1500
);

export const getRequestsOver1500msCount = createFilteredSelectorBasedOnCondition(
  value => value.elapsed > 1500
);

export const getRequestsErrorsCount = createFilteredSelectorBasedOnCondition(
  value => !value.success
);

export const getTimeElapsedPerRequest = state =>
  state.details.testData.map(request => request.elapsed);

const makeStatsLiteSelector = (property, ...args) =>
  createSelector(
    [getTimeElapsedPerRequest],
    elapsedValues =>
      transformToDecimal(statsLite[property](elapsedValues, ...args))
  );

export const getMean = makeStatsLiteSelector("mean");

export const getMedian = makeStatsLiteSelector("median");

export const getStandardDeviation = makeStatsLiteSelector("stdev");

export const get85thPercentile = makeStatsLiteSelector("percentile", 0.85);

export const get90thPercentile = makeStatsLiteSelector("percentile", 0.9);

export const get95thPercentile = makeStatsLiteSelector("percentile", 0.95);

export const getMode = createSelector(
  [getTimeElapsedPerRequest],
  elapsedValues => {
    const modes = statsLite.mode(elapsedValues);
    if (typeof modes === "object") {
      return Array.from(modes).join(", ");
    }
    return modes;
  }
);

export const getSuccessfullRequests = createSelector(
  [getTestData],
  data => data.filter(r => r.success)
);

export const getUnsuccessfullRequests = createSelector(
  [getTestData],
  data => data.filter(r => !r.success)
);

export const getFormattedGroups = createSelector(
  [getTestData],
  testData => testData.map(v => v.label.replace(/-.*/, "").trim())
);

export const getGroupLabels = createSelector(
  [getFormattedGroups],
  formattedGroups => [...new Set(formattedGroups)]
);

export const getElaspedPerGroup = createSelector(
  [getTestData],
  testData => {
    let groups = {};

    testData.forEach(row => {
      // changes jmeter thread/group names,
      // provided with "-" and number after group/thread
      const formatLabel = unformattedLabel =>
        unformattedLabel.replace(/-.*/, "").trim();

      const groupLabel = formatLabel(row.label);

      // if doesn't exist create property
      if (!groups.hasOwnProperty(groupLabel)) {
        groups[groupLabel] = [];
      }

      groups[groupLabel].push(row.elapsed);
    });

    return groups;
  }
);

const calculateStatBasedOnProperty = (property, ...args) => value => {
  return transformToDecimal(statsLite[property](value, ...args));
};

const reduceCalculatedPropertiesToObject = (...stats) => values =>
  stats.reduce((map, stat) => {
    map[stat] = calculateStatBasedOnProperty(stat)(values);
    return map;
  }, {});

export const getStatisticsPerGroup = createSelector(
  [getElaspedPerGroup],
  elapsedGroupes => {
    const stats = ["sum", "mean", "median", "variance", "stdev", "sampleStdev"];

    return Object.keys(elapsedGroupes).map(group => ({
      groupName: group,
      ...reduceCalculatedPropertiesToObject(...stats)(elapsedGroupes[group]),
      mode: statsLite.mode(elapsedGroupes[group]),
      percentile: calculateStatBasedOnProperty("percentile", 0.85)(
        elapsedGroupes[group]
      ),
      histogram: calculateStatBasedOnProperty("histogram", 10)(
        elapsedGroupes[group]
      )
    }));
  }
);
