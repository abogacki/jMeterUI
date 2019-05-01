import React from "react";
import { connect } from "react-redux";
import { Title } from "bloomer/lib/elements/Title";
import { Box } from "bloomer/lib/elements/Box";
import { Column } from "bloomer/lib/grid/Column";
import { Columns } from "bloomer/lib/grid/Columns";
import { Heading } from "bloomer/lib/elements/Heading";
import {
  getMean,
  getMedian,
  getStandardDeviation,
  get85thPercentile,
  get90thPercentile,
  get95thPercentile,
  getMode
} from "../../../redux/details/selectors";

const OverallStats = ({ mean, median, mode, standardDeviation, ...rest }) => {
  const statistics = {
    mean,
    median,
    mode,
    standardDeviation,
    "85thpercentile": rest["85thpercentile"],
    "90thpercentile": rest["90thpercentile"],
    "95thpercentile": rest["95thpercentile"]
  };
  return (
    <>
      <Title className="heading">Overall statistics</Title>
      <Box className="notification is-danger">
        <Columns>
          {Object.keys(statistics)
            .filter(stat => stat !== "mode")
            .map((stat, index) => {
              return (
                <Column key={index}>
                  <Heading>{stat}</Heading>
                  <Heading className="is-lowercase has-text-weight-light">
                    [ms]
                  </Heading>
                  <Title isSize={5}>{statistics[stat].toString()}</Title>
                </Column>
              );
            })}
        </Columns>
      </Box>
    </>
  );
};

const mapStateToProps = state => ({
  mean: getMean(state),
  median: getMedian(state),
  standardDeviation: getStandardDeviation(state),
  "85thpercentile": get85thPercentile(state),
  "90thpercentile": get90thPercentile(state),
  "95thpercentile": get95thPercentile(state),
  mode: getMode(state)
});

export default connect(mapStateToProps)(OverallStats);
