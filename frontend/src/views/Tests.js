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
        <div className="columns tests">
            {children}
        </div>
    </section>
)


const TestCard = ({testName, createdAt, ...props}) => {
    const getDate = () => {
        const d = new Date(createdAt)
        return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`
        };

    return (
    <div className="column is-4">
        <div className="card is-shady">
            <div className="card-image has-text-centered">
                <i className="fa fa-paw"></i>
            </div>
            <div className="card-content">
                <div className="content">
                    <h4>Test name: {testName} </h4>
                    <p>Creation date: {getDate()}</p>
                    <p><a href="/">Learn more</a></p>
                </div>
            </div>
        </div>
    </div>
)}

export default connect(mapStateToProps, mapDispatchToProps)(Tests)
