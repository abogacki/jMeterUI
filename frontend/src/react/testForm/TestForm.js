import React from "react";
import { withFormik, FieldArray } from "formik";
import { withFormField } from "../hocs/withFormField";
import { Label } from "bloomer/lib/elements/Form/Label";
import { Input } from "bloomer/lib/elements/Form/Input";
import { Control } from "bloomer/lib/elements/Form/Control";
import { Container } from "bloomer/lib/layout/Container";
import { Button } from "bloomer/lib/elements/Button";
import { Field } from "bloomer/lib/elements/Form/Field/Field";
import { Select } from "bloomer/lib/elements/Form/Select";
import { validationSchema } from "./validationSchema";
import { nestedFieldEnhancer } from "./nestedFieldEnhancer";
import { DeleteButton } from "../DeleteButton";

const TextField = withFormField(Input);
const SelectField = withFormField(Select);

const NestedSelect = nestedFieldEnhancer(SelectField);
const NestedTextField = nestedFieldEnhancer(TextField);

const TestForm = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    isSubmitting
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
      <br />
      <TextField
        id="baseURL"
        type="text"
        label="Base url"
        placeholder="http://sampledomain.com"
        error={touched.baseURL && errors.baseURL}
        value={values.baseURL}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <br />

      <Field>
        <Label>Request groups</Label>
        <FieldArray
          name="requestGroups"
          render={arrayHelpers => (
            <div>
              {values.requestGroups &&
                values.requestGroups.length > 0 &&
                values.requestGroups.map((grp, index) => (
                  <Control key={index}>
                    <NestedTextField
                      addons={
                        <DeleteButton
                          onClick={() => arrayHelpers.remove(index)}
                        />
                      }
                      name={`requestGroups.${index}.url`}
                      id={`requestGroups.${index}.url`}
                      placeholder="/type/some/url"
                      label="Url"
                      value={values.requestGroups[index].url}
                      onChange={handleChange}
                    />
                    <NestedSelect
                      name={`requestGroups.${index}.method`}
                      id={`requestGroups.${index}.method`}
                      label="Requests method"
                      value={values.requestGroups[index].method}
                      onChange={handleChange}
                      error={touched.requestGroups && errors.requestGroups}
                    >
                      <option value="" disabled>
                        Choose method
                      </option>
                      <option value="GET">GET</option>
                      <option value="POST">POST</option>
                      <option value="PUT">PUT</option>
                    </NestedSelect>

                    <NestedTextField
                      type="number"
                      name={`requestGroups.${index}.count`}
                      id={`requestGroups.${index}.count`}
                      placeholder="Request count"
                      label={"Count"}
                      value={values.requestGroups[index].count}
                      onChange={handleChange}
                    />
                    <hr />
                  </Control>
                ))}
              <Field>
                <Control>
                  <Button
                    className="is-rounded"
                    isColor="primary"
                    onClick={() =>
                      arrayHelpers.push({ type: "", route: "", count: "" })
                    }
                  >
                    Add request group
                  </Button>
                </Control>
              </Field>
            </div>
          )}
        />
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
          <Button
            type="submit"
            className="is-link is-rounded"
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </Control>
      </Field>
    </form>
  );
};

const formikEnhancer = withFormik({
  validationSchema,
  mapPropsToValues: ({ fields, onSubmit }) => ({
    ...fields,
    onSubmit
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    setSubmitting(false);
    props.onSubmit(values);
  },
  displayName: "CreateBenchmarkForm"
});

const EnhancedTestForm = formikEnhancer(TestForm);

export default ({ onSubmit }) => (
  <Container>
    <EnhancedTestForm
      onSubmit={onSubmit}
      fields={{
        name: "Somename",
        baseURL: "http://google.com",
        requestGroups: [
          { method: "GET", count: 10, url: "/" },
          { method: "GET", count: 1, url: "/gmail" }
        ]
      }}
    />
  </Container>
);
