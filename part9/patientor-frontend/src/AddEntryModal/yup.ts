import * as yup from 'yup';
import { CardType, NewEntry } from '../types';

const baseInitialProperties = {
  description: "",
  date: "",
  specialist: ""
};

export const initialValuesArray: NewEntry[] = [
  {
    type: CardType.HealthCheck,
    ...baseInitialProperties,
    healthCheckRating: 0
  },
  {
    type: CardType.OccupationalHealthcare,
    ...baseInitialProperties,
    employerName: "",
    sickLeave: {
      startDate: "",
      endDate: ""
    }
  },
  {
    type: CardType.Hospital,
    ...baseInitialProperties,
    discharge: {
      date: "",
      criteria: ""
    }
  },
];

export const yupSchema = yup.object().shape({
  description: yup
    .string()
    .min(10)
    .required('this is a required field'),
  date: yup
    .string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "please, enter date in the format YYYY-MM-DD")
    .required('this is a required field'),
  specialist: yup
    .string()
    .min(3)
    .required('this is a required field'),
  type: yup
    .string()
    .required('this is a required field'),
  healthCheckRating: yup
    .number()
    .when('type', {
      is: 'HealthCheck',
      then: yup
        .number()
        .min(0)
        .max(3)
        .required('this is a required field')
    }),
  employerName: yup
    .string()
    .when('type', {
      is: 'OccupationalHealthcare',
      then: yup
        .string()
        .min(3)
        .required('this is a required field')
    }),
  sickLeave: yup
    .object()
    .when('type', {
      is: 'OccupationalHealthcare',
      then: yup
        .object()
        .shape({
          startDate: yup
            .string()
            .matches(/^\d{4}-\d{2}-\d{2}$/, "please, enter date in the format YYYY-MM-DD")
            .required('this is a required field'),
          endDate: yup
            .string()
            .matches(/^\d{4}-\d{2}-\d{2}$/, "please, enter date in the format YYYY-MM-DD")
            .required('this is a required field')
        })
    }),
  discharge: yup
    .object()
    .when('type', {
      is: 'Hospital',
      then: yup
        .object()
        .shape({
          date: yup
            .string()
            .matches(/^\d{4}-\d{2}-\d{2}$/, "please, enter date in the format YYYY-MM-DD")
            .required('this is a required field'),
          criteria: yup
            .string()
            .min(10)
            .required('this is a required field')
        })
    })
});