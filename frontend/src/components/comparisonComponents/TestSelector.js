import React from 'react';
import { connect } from "react-redux";
import { select as selectTest, load as loadComparison } from '../../actions/compareActions'
import { Columns, Button, Title } from 'bloomer';
import { Column } from 'bloomer/lib/grid/Column';
import {withRouter} from 'react-router-dom';

const mapStateToProps = state => ({
    testsList: state.tests.list,
});

const mapDispatchToProps = dispatch => ({
    selectTest: id => dispatch(selectTest(id)),
    loadComparison: () => dispatch(loadComparison())
});


const ChooseTests = ({ testsList, selectTest, loadComparison, history }) => {
    return (
        <Columns isMultiline>
            <Column>
                <Button onClick={async e =>{ await loadComparison().then(() => history.push('/comparison'));  }}>Load</Button>
            </Column>
            {testsList &&
                testsList.length > 0 &&
                testsList.map((test, index) =>
                    <TestCard
                        {...test}
                        key={index}
                        onClick={selectTest}
                    />)}
        </Columns>
    )
}

const TestSelector = withRouter(connect(mapStateToProps, mapDispatchToProps)(ChooseTests));

export default TestSelector

const TestCard = ({ name, createdAt, testData, onClick, isSelected, ...props }) => {
    const convertDate = (date) => {
        const d = new Date(date)
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
    };
    const date = convertDate(createdAt)
    return (
        <div className="column is-4">
            <div className={"box notification " + (isSelected && 'is-info')}>
                <div className="content">
                    <div class="heading">
                    <i className="far fa-chart-bar"></i> Test name:
                    </div>
                    <Title> <u>{name} </u></Title>
                    <p>
                        <strong>Uploaded at:</strong> {date} <br />
                        Requests samples count: {testData.length}
                    </p>
                    <p><button type="button" className="button " onClick={onClick.bind(null, props['_id'])}>{isSelected ? 'Deselect' : 'Select'}</button></p>
                </div>

            </div>
        </div>
    )
}