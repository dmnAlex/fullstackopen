export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export enum CardTypeIcon {
  "HealthCheck" = "user doctor",
  "OccupationalHealthcare" = "stethoscope",
  "Hospital" = "hospital outline"
}

export enum CardType {
  HealthCheck = "HealthCheck",
  OccupationalHealthcare = "OccupationalHealthcare",
  Hospital = "Hospital"
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export enum GenderIcon {
  "male" = "mars",
  "female" = "venus",
  "other" = "other gender"
}

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  type: CardType;
  diagnosisCodes?: Array<Diagnose['code']>;
}

export interface HealthCheckEntry extends BaseEntry {
  type: CardType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthCareEntry extends BaseEntry {
  type: CardType.OccupationalHealthcare;
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export interface HospitalEntry extends BaseEntry {
  type: CardType.Hospital;
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

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

