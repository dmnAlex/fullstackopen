import patientData from '../../data/patients';
import { nonSensitivePatientEntries } from '../types';

const getEntries = (): nonSensitivePatientEntries[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

export default { getEntries };