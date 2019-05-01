import React from 'react'
import { connect } from 'react-redux'
import statsLite from 'stats-lite'
import { Title } from 'bloomer/lib/elements/Title';
import { Box } from 'bloomer/lib/elements/Box';
import { Column } from 'bloomer/lib/grid/Column';
import { Columns } from 'bloomer/lib/grid/Columns';
import { Heading } from 'bloomer/lib/elements/Heading';
import { createSelector } from 'reselect';

const OverallStats = ({ mean, median, mode, standardDeviation, ...percentiles }) => {


  const statistics = {
    mean,
    median,
    mode,
    standardDeviation,
    '85thpercentile': percentiles['85thpercentile'],
    '90thpercentile': percentiles['90thpercentile'],
    '95thpercentile': percentiles['95thpercentile'],
  }
  return (
    <>
      <Title className="heading">
        Overall statistics
        </Title>
      <Box className="notification is-danger">
        <Columns>
          {
            Object.keys(statistics).filter(stat => stat !== "mode").map((stat, index) => {
              return (
                <Column key={index}>
                  <Heading>{stat}</Heading>
                  <Heading className="is-lowercase has-text-weight-light">[ms]</Heading>
                  <Title isSize={5}>
                    {statistics[stat].toString()}
                  </Title>
                </Column>)
            })
          }
        </Columns>
      </Box>
    </>
  )
}

const transformToDecimal = value => Math.round(value * 100) / 100

const getTimeElapsedPerRequest = state => state.details.testData.map(request => request.elapsed)
const makeStatsLiteSelector = (property, ...args) => createSelector([getTimeElapsedPerRequest], elapsedValues => transformToDecimal(statsLite[property](elapsedValues, ...args)))
const getMean = makeStatsLiteSelector('mean')
const getMedian = makeStatsLiteSelector('median')
const getStandardDeviation = makeStatsLiteSelector('stdev')
const get85thPercentile = makeStatsLiteSelector('percentile', 0.85)
const get90thPercentile = makeStatsLiteSelector('percentile', 0.90)
const get95thPercentile = makeStatsLiteSelector('percentile', 0.95)
const getMode = createSelector([getTimeElapsedPerRequest], elapsedValues => {
  const modes = statsLite.mode(elapsedValues)
  if (typeof (modes) === 'object') {
    return modes.join(', ')
  }
  return modes
})

const mapStateToProps = state => ({
  mean: getMean(state),
  median: getMedian(state),
  standardDeviation: getStandardDeviation(state),
  '85thpercentile': get85thPercentile(state),
  '90thpercentile': get90thPercentile(state),
  '95thpercentile': get95thPercentile(state),
  mode: getMode(state),
})

export default connect(mapStateToProps)(OverallStats)
