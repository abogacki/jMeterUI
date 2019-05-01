import React from "react";
import { defaults } from "react-chartjs-2";
import {
  Box,
  Title,
  Columns,
  Column,
  Level,
  LevelItem,
  LevelLeft
} from "bloomer";
import { connect } from "react-redux";
import {
  getCreationDate,
  getTestName,
  getBeginDate,
  getEndDate,
  getElapsed,
  getThreadNames,
  getRequestsSamplesCount
} from "../../../redux/details/selectors";

defaults.global.defaultFontFamily = "'Oxygen', sans-serif";

const Info = ({
  beginDate,
  endDate,
  elapsed,
  threads,
  testName,
  creationDate,
  samplesCount
}) => {
  return (
    <>
      <Title className="heading">
        <i className="fas fa-tachometer-alt" /> Info
      </Title>
      <Columns isMultiline>
        <Column>
          <Box className="notification is-info">
            <div className="heading">Test name:</div>
            <Title>
              <i className="fas fa-file-signature" /> {testName}
            </Title>
          </Box>
        </Column>
        <Column>
          <Box className="notification is-primary">
            <Level>
              <LevelItem>
                <div>
                  <div className="heading">Uploaded: </div>
                  <Title style={{ wordBreak: "initial" }}>
                    <i className="fas fa-calendar" />{" "}
                    {creationDate.toLocaleDateString()}
                  </Title>
                </div>
              </LevelItem>
            </Level>
            <Level>
              <LevelItem>
                <div>
                  <div className="heading">Performed: </div>
                  <Title style={{ wordBreak: "initial" }}>
                    <i className="fas fa-calendar" />{" "}
                    {beginDate.toLocaleDateString()}
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
                      <i className="fas fa-sort-amount-up" /> {samplesCount}
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
                    <Title
                      isSize={5}
                    >{`${beginDate.getHours()}:${beginDate.getMinutes()}:${beginDate.getSeconds()}`}</Title>
                  </div>
                </LevelItem>
                <LevelItem>
                  <div>
                    <div className="heading">finished: </div>
                    <Title
                      isSize={5}
                    >{`${endDate.getHours()}:${endDate.getMinutes()}:${endDate.getSeconds()}`}</Title>
                  </div>
                </LevelItem>
              </LevelLeft>
            </Level>
          </Box>
        </Column>
      </Columns>
    </>
  );
};

const mapStateToProps = state => ({
  isLoading: state.details.isLoading,
  creationDate: getCreationDate(state),
  beginDate: getBeginDate(state),
  endDate: getEndDate(state),
  elapsed: getElapsed(state),
  threads: getThreadNames(state),
  testName: getTestName(state),
  samplesCount: getRequestsSamplesCount(state)
});

export default connect(mapStateToProps)(Info);
