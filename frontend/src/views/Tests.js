import React, { Component } from 'react';
import { connect } from 'react-redux'
import { list as getTestList } from '../actions/benchmarkDataActions';
import { Title, Level, LevelItem, Box, Button } from 'bloomer';

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
                {this.props.testsLists && this.props.testsLists.length > 0 && this.props.testsLists.map((test, index) => <TestCard key={index} {...test} />)}
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


const TestCard = ({ name, createdAt, testData, ...props }) => {
    const convertDate = (date) => {
        const d = new Date(date)
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
    };
    const date = convertDate(createdAt)
    return (
        <div className="column is-4">
            <Box className="notification is-white">
                <div className="card-content">
                    <div className="content">
                        <div class="heading">
                            <i className="far fa-chart-bar"></i> Test name:
                        </div>
                        <Title>{name} </Title>
                        <hr />
                        <Level>
                            <LevelItem>
                                <div>

                                    <div className="heading">Uploaded at:</div>
                                    {date}
                                </div>
                            </LevelItem>
                            <LevelItem>
                                <div>

                                    <div className="heading">
                                        Requests samples count:
                                </div>
                                    {testData.length}
                                </div>
                            </LevelItem>
                        </Level>
                        <Button className="is-rounded is-info" href={`/#/stats/${props['_id']}`}>Details</Button>
                    </div>
                </div>
            </Box>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Tests)
