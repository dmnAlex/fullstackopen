export enum Gender {
  Male = 'male',
  Female = 'female'
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Entry {
}

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type nonSensitivePatientEntries = Omit<Patient, 'ssn' | 'entries'>;
export type newPatientEntry = Omit<Patient, 'id' | 'entries'>;