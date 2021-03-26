export enum Gender {
  Male = 'male',
  Female = 'female'
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

// export enum EntryType {
//   HealthCheck = "HealthCheck",
//   OccupationalHealthcare = "OccupationalHealthcare",
//   Hospital = "Hospital"
// }

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthCareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}

export type Entry = HealthCheckEntry | OccupationalHealthCareEntry | HospitalEntry;
export type NewEntry = 
  | Omit<HealthCheckEntry, 'id'>
  | Omit<OccupationalHealthCareEntry, 'id'>
  | Omit<HospitalEntry, 'id'>;
export type EntryType = 'HealthCheck' | 'OccupationalHealthcare' | 'Hospital';

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