import React, { Component } from 'react';
import { connect } from 'react-redux'
import { list as getTestList } from '../actions/benchmarkDataActions';

const mapDispatchToProps = dispatch => ({
    getTestList: () => dispatch(getTestList())
})


const mapStateToProps = state => ({
    testsLists: state.tests.list
})
class Tests extends Component {
    componentWillMount() {
        this.props.getTestList()
    }

    render() {
        return (
            <TestsContent>
                {this.props.testsLists && this.props.testsLists.length > 0 && this.props.testsLists.map((test, index) => <TestCard key={index} {...test} />) }
            </TestsContent>
        )
    }
}



const TestsContent = ({ children }) => (
    <section className="container">
        <div className="columns tests is-multiline">
            {children}
        </div>
    </section>
)


const TestCard = ({name, createdAt, testData, ...props}) => {
    const convertDate = (date) => {
        const d = new Date(date)
        return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`
        };
    const date = convertDate(createdAt)
    return (
    <div className="column is-4">
        <div className="card">
            <div className="card-content">
                <div className="content">
                    <h4><i className="far fa-chart-bar"></i> Test name: {name} </h4>
                    <p>
                    Uploaded at: {date} <br/>
                    Requests samples count: {testData.length}
                    </p>
                    <p><a href={`/#/stats/${props['_id']}`}>Go to test details</a></p>
                </div>
            </div>
        </div>
    </div>
)}

export default connect(mapStateToProps, mapDispatchToProps)(Tests)
