import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getList as getTestsList } from "../../../redux/benchmarks/benchmarks";
import TestCard from "./TestCard";
import TestsContainer from "./TestsContainer";

const Tests = ({ testsLists, getTestsList }) => {
  useEffect(() => {
    getTestsList();
  }, []);
  return (
    <TestsContainer>
      {testsLists &&
        testsLists.length > 0 &&
        testsLists.map((test, index) => <TestCard key={index} {...test} />)}
    </TestsContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  getTestsList: () => dispatch(getTestsList())
});

const mapStateToProps = state => ({
  testsLists: state.benchmarks.list
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tests);
