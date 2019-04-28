import React from 'react'
import { Help } from 'bloomer/lib/elements/Form/Help';
import { Field } from 'bloomer/lib/elements/Form/Field/Field';
import { Control } from 'bloomer/lib/elements/Form/Control';
import { Label } from 'bloomer/lib/elements/Form/Label';

export const withFormField = Component => ({ label, id, error, addons, meta, ...props }) =>
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