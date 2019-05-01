import { createSelector } from "reselect";
import convertTimeStampToDate from "./convertTimeStampStringToDate";
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

const transformToDecimal = value => Math.round(value * 100) / 100;

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
