import React from 'react'
import { Container } from 'bloomer/lib/layout/Container';
import { Field } from 'bloomer/lib/elements/Form/Field/Field';
import { Label } from 'bloomer/lib/elements/Form/Label';
import { Control } from 'bloomer/lib/elements/Form/Control';
import { Input } from 'bloomer/lib/elements/Form/Input';
import { Select } from 'bloomer/lib/elements/Form/Select';
import { Button } from 'bloomer/lib/elements/Button';
import { Icon } from 'bloomer/lib/elements/Icon';
import { Formik } from 'formik'

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

const FormField = ({ label, ...props }) => (
  <Field>
    <Label>{label}</Label>
    <Control>
      <Input {...props} />
    </Control>
  </Field>)

const enhanceFormField = onChange => props => <FormField onChange={onChange} {...props} />

const TestForm = ({ requestGroups, onGroupChange, onChange, addGroup, submit, reset, name, baseURL, isLoading }) => {

  const EnhancedFormField = enhanceFormField(onChange)

  return (
    <Container>
      <EnhancedFormField label="Name" name="name" value={name} />
      <EnhancedFormField label="Base URL" name="baseURL" value={baseURL} />

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
        {requestGroups && requestGroups.length > 0 && requestGroups.map((rg, index) =>
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
}

export default TestForm