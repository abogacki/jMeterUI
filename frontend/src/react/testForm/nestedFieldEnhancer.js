import React from 'react'
import { Field, getIn } from 'formik';

export const nestedFieldEnhancer = Component => ({ name, ...props }) => {
  return (
    <Field
      {...props}
      render={({ form }) => {
        const error = getIn(form.errors, name);
        const touch = getIn(form.touched, name);
        return <Component {...props} error={touch && error ? error : null} />
      }}
    />
  )
}
