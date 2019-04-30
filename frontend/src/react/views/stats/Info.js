import React from 'react';
import { defaults } from 'react-chartjs-2';
import { Box, Title, Columns, Column, Level, LevelItem, LevelLeft } from 'bloomer'
import { connect } from 'react-redux';
import { createSelector } from 'reselect'

defaults.global.defaultFontFamily = "'Oxygen', sans-serif";

const convertTimeStampToDate = timeStampString => {
  const timeStamp = Number(timeStampString)
  const beginDate = new Date(timeStamp)
  return beginDate
}

// Refactor pending
const getCreatedAt = state => state.benchmarks.test.data._doc.createdAt
const getCreationDate = createSelector([getCreatedAt], createdAt => new Date(createdAt))
const getTestName = state => state.benchmarks.test.data._doc.name
const getTestData = state => state.benchmarks.test.data.testData
const getFirstRequestTimeStamp = createSelector([getTestData], testData => testData[0].timeStamp)
const getLastRequestTimeStamp = createSelector([getTestData], testData => testData.slice(-1)[0].timeStamp)
const getBeginDate = createSelector([getFirstRequestTimeStamp], convertTimeStampToDate)
const getEndDate = createSelector([getLastRequestTimeStamp], convertTimeStampToDate)
const getElapsed = createSelector([getBeginDate, getEndDate], (beginDate, endDate) => {
  return Math.floor((endDate.getTime() - beginDate.getTime()) / 1000)
})
const getThreadNames = createSelector([getTestData], testData => {
  const allRequestsThreads = testData.map(r => r.threadName.trim())
  const uniqueThreads = [...new Set((allRequestsThreads))]
  return uniqueThreads
})
const getRequestsSamplesCount = createSelector([getTestData], testData => testData.length)

const mapStateToProps = state => ({
  creationDate: getCreationDate(state),
  beginDate: getBeginDate(state),
  endDate: getEndDate(state),
  elapsed: getElapsed(state),
  threads: getThreadNames(state),
  testName: getTestName(state),
  samplesCount: getRequestsSamplesCount(state)
})

const Info = ({ beginDate, endDate, elapsed, threads, testName, creationDate, samplesCount}) => {
  return (
    <  >
      <Title className="heading">
        <i className="fas fa-tachometer-alt"></i> Info
            </Title>
      <Columns isMultiline>
        <Column>
          <Box className="notification is-info" >
            <div className="heading">
              Test name:
                        </div>

            <Title>
              <i className="fas fa-file-signature"></i> {testName}
            </Title>
          </Box>
        </Column>
        <Column>
          <Box className="notification is-primary">
            <Level>
              <LevelItem>
                <div>

                  <div className="heading">Uploaded: </div>
                  <Title>
                    <i className="fas fa-calendar"></i> {creationDate.toLocaleDateString()}
                  </Title>
                </div>
              </LevelItem>
            </Level>
            <Level>
              <LevelItem>
                <div>

                  <div className="heading">Performed: </div>
                  <Title>
                    <i className="fas fa-calendar"></i> {beginDate.toLocaleDateString()}
                  </Title>
                </div>
              </LevelItem>
            </Level>
          </Box>
        </Column>
        <Column>
          <Box className="notification is-warning">
            <Level>
              <LevelLeft>
                <LevelItem>
                  <div>
                    <div className="heading">Requests samples count: </div>
                    <Title>
                      <i className="fas fa-sort-amount-up"></i> {samplesCount}
                    </Title>
                  </div>

                </LevelItem>
              </LevelLeft>
            </Level>

            <Level>
              <LevelLeft>
                <LevelItem>
                  <div>
                    <div className="heading">Threads: </div>
                    <Title>
                      <i className="fas fa-code-branch" /> {threads.length}
                    </Title>
                  </div>
                </LevelItem>
              </LevelLeft>
            </Level>

          </Box>
        </Column>
        <Column>
          <Box className="notification is-link">
            <div className="heading">Time elapsed: </div>
            <Title>
              <i className="fas fa-clock" /> ~{`${elapsed} sec`}
            </Title>
            <Level>
              <LevelLeft>

                <LevelItem>
                  <div>
                    <div className="heading">started: </div>
                    <Title isSize={5}>{`${beginDate.getHours()}:${beginDate.getMinutes()}:${beginDate.getSeconds()}`}</Title>
                  </div>
                </LevelItem>
                <LevelItem>
                  <div>
                    <div className="heading">finished: </div>
                    <Title isSize={5}>{`${endDate.getHours()}:${endDate.getMinutes()}:${endDate.getSeconds()}`}</Title>
                  </div>
                </LevelItem>
              </LevelLeft>
            </Level>
          </Box>
        </Column>
      </Columns>
    </ >
  )
}

export default connect(mapStateToProps)(Info)