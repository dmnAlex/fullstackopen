import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router';
import { Container, Icon } from 'semantic-ui-react';
import { apiBaseUrl } from '../constants';
import { updatePatient, useStateValue } from '../state';
import { Patient, Entry } from '../types';

const PatientPage = () => {
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const fetchPatient = async () => {
    try {
      const { data: patientFromApi } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      dispatch(updatePatient(patientFromApi));
    } catch (e) {
      console.error(e);
    }
  };

  const patient: Patient = patients[id];

  if (!patient || !patient.ssn) {
    void fetchPatient();
    return null;
  }

  return (
    <div className="App">
      <Container>
        <h2>{patient.name}<Icon name={patient.gender === 'male' ? 'mars' : 'venus'} /></h2>
        <p>{`snn: ${patient.ssn}`}</p>
        <p>{`occupation: ${patient.occupation}`}</p>
        <h3>entries</h3>
        {patient.entries.map((entry: Entry) => (
          <div key={entry.id}>
            {entry.date} <i>{entry.description}</i>
            {!entry.diagnosisCodes ? null : <ul>{entry.diagnosisCodes.map((code: string, index: number) =>
              (<li key={index}>{code} {diagnoses[code] ? diagnoses[code].name : null}</li>)
            )}</ul>}
          </div>
        ))}
      </Container>
    </div>
  );
};

export default PatientPage;