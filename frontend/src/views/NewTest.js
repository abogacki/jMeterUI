import React from 'react'
import { Button, Container, Field, Label, Control, Input, Icon, Select, } from 'bloomer';
import axios from 'axios';
// import uuidv1 from 'uuid/v1';
import { connect } from 'react-redux';
import { create as createBenchmark } from '../actions/benchmarkDataActions';


axios.interceptors.request.use(function (config) {
    config.metadata = { startTime: new Date() }
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    response.config.metadata.endTime = new Date()
    response.elapsed = response.config.metadata.endTime - response.config.metadata.startTime
    return response;
}, function (error) {
    error.config.metadata.endTime = new Date();
    error.elapsed = 0;
    return Promise.reject(error);
});

const NewTestForm = ({ requestGroups, onGroupChange, onChange, addGroup, submit, reset, name, baseURL, isLoading }) => (
    <Container>
        <Field>
            <Label>Name</Label>
            <Control>
                <Input name="name" type="text" onChange={onChange} value={name} />
            </Control>
        </Field>

        <Field>
            <Label>Base URL</Label>
            <Control>
                <Input name="baseURL" onChange={onChange} value={baseURL} />
            </Control>
        </Field>

        <Field>
            <Label>Add request group</Label>
            <Control>
                <Button onClick={addGroup}>
                    <Icon className="fas fa-plus" />
                    <span>Add</span>
                </Button>
            </Control>
        </Field>

        <Field>
            {requestGroups.map((rg, index) =>
                <RequestGroup onChange={onGroupChange} key={index} index={index} {...rg} />)
            }
        </Field>

        <Field isGrouped>
            <Control>
                <Button isColor='primary' onClick={submit} isLoading={isLoading}>Submit</Button>
            </Control>
            <Control>
                <Button isLink onClick={reset}>Cancel</Button>
            </Control>
        </Field>
    </Container>
)


const RequestGroup = ({ index, onChange, url, method, count }) => (
    <Field>
        <hr />
        <Label>Group #{index + 1}</Label>
        <Control>
            <Field>
                <Control>
                    <Label>Request Url</Label>
                    <Input type="text" name="url" onChange={e => onChange(e, index)} value={url} />
                </Control>
            </Field>
            <Field>
                <Control>
                    <Label>Request Method</Label>
                    <Select name="method" onChange={e => onChange(e, index)} value={method}>
                        <option value="" disabled>Choose method</option>
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                    </Select>
                </Control>
            </Field>
            <Field>
                <Control>
                    <Label>Request count</Label>
                    <Input type="number" name="count" onChange={e => onChange(e, index)} value={count} />
                </Control>
            </Field>
        </Control>
    </Field>
)

class NewTestClassComponent extends React.Component {
    state = {
        name: 'Keystone',
        baseURL: 'http://localhost:8080/api',
        requestGroups: [
            { url: '/test/list', method: 'GET', count: '30' }
        ],
        isLoading: false
    }

    handleGroupAdd(e) {
        this.setState(prevState => prevState.requestGroups.push({ url: '', method: '', count: '' }))
    }

    async handleSubmit(e) {
        this.setState(prevState => ({ ...prevState, isLoading: true }))

        const onSuccess = (response) => {
            this.setState(prevState => ({ ...prevState, isLoading: false }))
            const converted = response.map(r => convertTypes(r));
            
            this.props.createBenchmark({name: this.state.name, data: converted})

        }

        try {
            const { requestGroups, baseURL } = this.state;

            const requests = [];

            requestGroups.forEach(({ count, ...rg }) => range(count).forEach(r => requests.push(rg)));

            const results = await Promise.all(requests.map(({ name, ...rest }) => axios({ baseURL, ...rest })))

            onSuccess(results)
        } catch (error) {
            this.setState(prevState => ({ ...prevState, isLoading: false }))
            alert(error)
        }
    }

    handleChange(e) {
        e.persist()
        this.setState(prevState =>
            ({
                ...prevState,
                [e.target.name]: e.target.value
            })
        )
    }
    handleGroupChange(e, index) {
        e.persist()
        console.log(e.target.name, index);
        let requestGroups = [...this.state.requestGroups]
        requestGroups[index] = {
            ...requestGroups[index],
            [e.target.name]: e.target.value
        };

        this.setState(prevState => ({
            ...prevState,
            requestGroups
        }), () => console.log(this.state))
    }
    render() {
        return (
            <React.Fragment>
                <NewTestForm
                    onChange={this.handleChange.bind(this)}
                    addGroup={this.handleGroupAdd.bind(this)}
                    onGroupChange={this.handleGroupChange.bind(this)}
                    submit={this.handleSubmit.bind(this)}
                    {...this.state}
                />
            </React.Fragment>
        )
    }
}

const range = (len = 100) => {
    let arr = []
    for (let i = 0; i < len; i++) {
        arr[i] = i;
    }
    return arr
}

const convertTypes = ({ elapsed, request, config, ...props }) => {
    console.log(props);

    return ({
        IdleTime: Math.floor(Math.random() / 100) * 100,
        Latency: Math.floor(Math.random() / 100) * 100,
        allThreads: Math.floor(Math.random() / 100) * 100,
        bytes: Math.floor(Math.random() / 100) * 100,
        dataType: " ",
        elapsed,
        failureMessage: '',
        label: request.responseURL.toString(),
        responseCode: Math.floor(Math.random() / 100) * 100,
        responseMessage: '',
        sentBytes: Math.floor(Math.random() / 100) * 100,
        success: true,
        threadName: request.responseURL,
        timeStamp: new Date(config.metadata.endTime).getTime()*1000,
    })
}

const mapDispatchToProps = dispatch => ({
    createBenchmark: (data, history) => dispatch(createBenchmark(data, history))
})

export default connect(null, mapDispatchToProps)(NewTestClassComponent)