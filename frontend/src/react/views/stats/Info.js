import React from 'react';
import { defaults } from 'react-chartjs-2';
import { Box, Title, Columns, Column, Level, LevelItem, LevelLeft } from 'bloomer'
import { connect } from 'react-redux';

defaults.global.defaultFontFamily = "'Oxygen', sans-serif";

const mapStateToProps = state => ({
  ...state.benchmarks.test.data,
})

const Info = ({ testData, ...props }) => {
  const uploadDate = new Date(props._doc.createdAt)
  const beginTimeStamp = Number(testData[0].timeStamp);
  const beginDate = new Date(Math.floor(beginTimeStamp / 1000));
  const endTimeStamp = Number(testData.slice(-1)[0].timeStamp);
  const endDate = new Date(Math.floor(endTimeStamp / 1000));
  const elapsed = Math.floor((endDate.getTime() - beginDate.getTime()) / 1000)
  let threads = []
  testData.forEach(v => threads.includes(v.threadName.trim()) ? '' : threads.push(v.threadName.trim()));
  return (
    <React.Fragment >
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
              <i className="fas fa-file-signature"></i> {props._doc.name}
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
                    <i className="fas fa-calendar"></i> {uploadDate.toLocaleDateString()}
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
                      <i className="fas fa-sort-amount-up"></i> {testData.length}
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
    </React.Fragment>
  )
}

const InfoConnect = props => (
  <React.Fragment>
    {props._doc && <Info {...props} />}
  </React.Fragment>
)

export default connect(mapStateToProps)(InfoConnect)