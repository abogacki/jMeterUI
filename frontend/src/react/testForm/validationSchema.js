import * as Yup from 'yup';

// eslint-disable-next-line
const matchUrlFormat = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}/
const urlRegExp = new RegExp(matchUrlFormat)

const requestGroupValidationSchema = Yup.object().shape({
  url: Yup.string('Url must be a string').required('Url is required'),
  method: Yup.string('Type must be a string').required('Type is required'),
  count: Yup.number('Count must be a number').required('Count is required'),
})

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required.')
    .min(3, "Benchmak name must have at least 3 characters"),
  baseURL: Yup.string()
    .matches(urlRegExp, 'Base URL must begin with http:// or https:// prefix')
    .required('Base url is required.'),
  requestGroups: Yup.array().of(requestGroupValidationSchema),
})