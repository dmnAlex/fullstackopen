import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router';
import { Button, Container, Icon } from 'semantic-ui-react';
import AddEntryModal from '../AddEntryModal';
import { apiBaseUrl } from '../constants';
import { updatePatient, useStateValue } from '../state';
import { Patient, Entry, GenderIcon, HealthCheckEntry } from '../types';
import EntryDetails from './EntryDetails';

const PatientPage = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const [{ patients }, dispatch] = useStateValue();
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
  const submitNewEntry = async (values: Omit<HealthCheckEntry, 'id'>) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { data: entryFromApi } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      const updatedPatient = {
        ...patient,
        entries: patient.entries.concat(entryFromApi)
      };
      dispatch(updatePatient(updatedPatient));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data || 'Unknown error');
    }
  };

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const patient: Patient = patients[id];

  if (!patient || !patient.ssn) {
    void fetchPatient();
    return null;
  }

  return (
    <div className="App">
      <Container>
        <h2>{patient.name}<Icon name={GenderIcon[patient.gender]} /></h2>
        <p>{`snn: ${patient.ssn}`}</p>
        <p>{`occupation: ${patient.occupation}`}</p>
        <h3>entries</h3>
        {patient.entries.map((entry: Entry) => (
          <EntryDetails key={entry.id} entry={entry} />
        ))}
      </Container>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        onClose={closeModal}
        error={error}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
};

export default PatientPage;