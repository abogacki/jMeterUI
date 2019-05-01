import React from "react";
import { defaults } from "react-chartjs-2";
import { connect } from "react-redux";
import Info from "./Info";
import OverallStats from "./OverallStats";

defaults.global.defaultFontFamily = "'Oxygen', sans-serif";

const mapStateToProps = state => ({
  testData: state.details.testData,
  isLoading: state.details.isLoading
});

export default connect(mapStateToProps)(({ isLoading, testData }) => {
  return (
    <>
      {!isLoading && testData && testData.length > 0 ? (
        <>
          <Info />
          <OverallStats />
        </>
      ) : (
        <div className="loader" />
      )}
    </>
  );
});
