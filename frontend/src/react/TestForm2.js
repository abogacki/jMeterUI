import React from 'react';
import { withFormik, FieldArray, Field as FormikField } from 'formik';
import * as Yup from 'yup';
import { Help } from 'bloomer/lib/elements/Form/Help';
import { Label } from 'bloomer/lib/elements/Form/Label';
import { Input } from 'bloomer/lib/elements/Form/Input';
import { Control } from 'bloomer/lib/elements/Form/Control';
import { Container } from 'bloomer/lib/layout/Container';
import { Button } from 'bloomer/lib/elements/Button';
import { Icon } from 'bloomer/lib/elements/Icon';
import { Field } from 'bloomer/lib/elements/Form/Field/Field';
import { Select } from 'bloomer/lib/elements/Form/Select';


// eslint-disable-next-line
const matchUrlFormat = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}/
const urlRegExp = new RegExp(matchUrlFormat)

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .required('Name is required.')
      .min(3, "Benchmak name must have at least 3 characters"),
    baseURL: Yup.string()
      .matches(urlRegExp, 'Base URL must begin with http:// or https:// prefix')
      .required('Base url is required.'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required!'),
  }),

  mapPropsToValues: ({ fields }) => ({
    ...fields,
  }),
  handleSubmit: (payload, { setSubmitting }) => {
    alert(payload.email);
    setSubmitting(false);
  },
  displayName: 'CreateBenchmarkForm',
});

const DeleteButton = props => <Button isColor="danger" {...props}><Icon className="fas fa-times" /></Button>

const withFormField = Component => ({ label, id, error, addons, ...props }) =>
  <Field>
    <Label htmlFor={id}>{label}</Label>
    <Field hasAddons>
      <Control isExpanded>
        <Component id={id} {...props} className={!!error ? "is-danger" : ''} />
      </Control>
      {addons && <Control>
        {addons}
      </Control>}
    </Field>
    {error && <Help className="is-danger" >{error}</Help>}
  </Field>

const TextField = withFormField(Input)

const SelectField = withFormField(Select)

const MyForm = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    isSubmitting,
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="name"
        type="text"
        label="Benchmark name"
        placeholder="benchmark-01"
        error={touched.name && errors.name}
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <TextField
        id="baseURL"
        type="text"
        label="Base url"
        placeholder="http://somedomain.com"
        error={touched.baseURL && errors.baseURL}
        value={values.baseURL}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <Field>
        <Label>
          Request groups
        </Label>
        <FieldArray
          name='requestGroups'
          render={arrayHelpers => (
            <div>
              {values.requestGroups && values.requestGroups.length > 0 &&
                values.requestGroups.map((grp, index) =>
                <>
                  <Control key={index}>
                    <FormikField
                      component={TextField}
                      addons={<DeleteButton onClick={() => arrayHelpers.remove(index)} />}
                      name={`requestGroups.${index}.route`}
                      id={`requestGroups.${index}.route`}
                      placeholder='/type/some/route'
                      label={'Route'}
                    />

                    <FormikField
                      component={SelectField}
                      name={`requestGroups.${index}.type`}
                      id={`requestGroups.${index}.type`}
                      label='Requests type'
                    >
                      <option value="" disabled>Choose method</option>
                      <option value="GET">GET</option>
                      <option value="POST">POST</option>
                      <option value="PUT">PUT</option>
                    </FormikField>

                    <FormikField
                      component={TextField}
                      type="number"
                      name={`requestGroups.${index}.count`}
                      id={`requestGroups.${index}.count`}
                      placeholder='Request count'
                      label={'Count'}
                    />
                  </Control>
                  <hr/>
                  </>
                )}
              <Field>
                <Control>
                  <Button className="is-rounded" isColor="primary" onClick={() => arrayHelpers.push('')}>
                    Add request group
              </Button>
                </Control>
              </Field>
            </div>
          )
          } />
      </Field>
      <Field className="is-grouped">
        <Control>
          <Button
            className="is-rounded"
            onClick={handleReset}
            disabled={!dirty || isSubmitting}
          >
            Reset
      </Button>
        </Control>
        <Control>
          <Button type="submit" className="is-link is-rounded" disabled={isSubmitting}>
            Submit
          </Button>
        </Control>
      </Field>

    </form>
  );
};

const MyEnhancedForm = formikEnhancer(MyForm);

export default () => <Container><MyEnhancedForm fields={{ name: '', baseURL: '', requestGroups: [] }} /></Container>