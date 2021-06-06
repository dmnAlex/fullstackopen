import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { Button, Grid, Header } from 'semantic-ui-react';
import { DiagnosisSelection, NumberField, TextField, TypeField, TypeOption } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { CardType, NewEntry } from '../types';
import { initialValuesArray, yupSchema } from './yup';


interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { value: CardType.HealthCheck, label: "HealthCheck" },
  { value: CardType.OccupationalHealthcare, label: "OccupationalHealthcare" },
  { value: CardType.Hospital, label: "Hospital" }
];

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  const [iniVal, setIniVal] = useState<NewEntry>(initialValuesArray[0]);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={iniVal}
      validationSchema={yupSchema}
      onSubmit={onSubmit}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values, handleReset }) => {
        const onChange = (event: React.SyntheticEvent<HTMLElement, Event>) => {
          const target = event.target as HTMLSelectElement;
          const value = target.value as CardType;
          const index = typeOptions.map(item => item.value).indexOf(value);
          setFieldValue('type', value);
          setIniVal(initialValuesArray[index]);
          handleReset();
        };

        return (
          <Form className="form ui">
            <TypeField
              label="Type"
              name="type"
              options={typeOptions}
              onChange={onChange}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            {values.type === CardType.HealthCheck && (
              <div>
                <Field
                  label="healthCheckRating"
                  name="healthCheckRating"
                  component={NumberField}
                  min={0}
                  max={3}
                />
              </div>
            )}
            {values.type === CardType.OccupationalHealthcare && (
              <div>
                <Field
                  label="Employer"
                  placeholder="Employer name"
                  name="employerName"
                  component={TextField}
                />
                <Header size="small">Sick leave</Header>
                <Field
                  label="Start date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.startDate"
                  component={TextField}
                />
                <Field
                  label="End date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.endDate"
                  component={TextField}
                />
              </div>
            )}
            {values.type === CardType.Hospital && (
              <div>
                <Field
                  label="Discharge date"
                  placeholder="YYYY-MM-DD"
                  name="discharge.date"
                  component={TextField}
                />
                <Field
                  label="Discharge criteria"
                  placeholder="Criteria"
                  name="discharge.criteria"
                  component={TextField}
                />
              </div>
            )}
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;