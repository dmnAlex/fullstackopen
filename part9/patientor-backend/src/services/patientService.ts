import patientData from '../../data/patients';
import { newPatientEntry, nonSensitivePatientEntries, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const getEntries = (): nonSensitivePatientEntries[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
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

export default { getEntries, getPatient, addPatient };