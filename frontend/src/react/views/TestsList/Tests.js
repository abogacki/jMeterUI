import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { list as getTestList } from '../../../redux/benchmarks/benchmarks';
import TestCard from './TestCard'
import TestsContainer from './TestsContainer'

const Tests = ({ testsLists, getTestList }) => {
  useEffect(() => {
    getTestList()
  }, [])
  return (
    <TestsContainer>
      {testsLists && testsLists.length > 0 &&
        testsLists.map(test, index =>
          <TestCard key={index} {...test} />
        )}
    </TestsContainer>
  )
}

const mapDispatchToProps = dispatch => ({
  getTestList: () => dispatch(getTestList())
})


const mapStateToProps = state => ({
  testsLists: state.benchmarks.test.list
})


export default connect(mapStateToProps, mapDispatchToProps)(Tests)
