import patientData from '../../data/patients';
import { Entry, NewEntry, newPatientEntry, nonSensitivePatientEntries, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const getEntries = (): nonSensitivePatientEntries[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id, name, dateOfBirth, gender, occupation, entries
  }));
};

const getPatient = (id: string): Patient | undefined => {
  return patientData.find(patient => patient.id === id);
};

const addPatient = (entry: newPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    entries: [],
    ...entry
  };

  patientData.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (entry: NewEntry, id: string): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry
  };

  const patient = patientData.find(patient => patient.id === id);

  if (!patient) {
    throw new Error('Incorrect patient id');
  } else {
    patient.entries.push(newEntry);
    return newEntry;
  }
};

export default { getEntries, getPatient, addPatient, addEntry };