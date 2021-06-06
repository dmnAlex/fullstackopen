import { newPatientEntry, Gender, Diagnose, EntryType, HealthCheckRating, BaseEntry, NewEntry } from './src/types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseString = (param: unknown, name: string): string => {
  if (!param || !isString(param)) {
    throw new Error(`Incorrect or missing ${name}: ${param}`);
  }
  return param;
};

const parseDate = (param: unknown, name: string): string => {
  if (!param || !isString(param) || !isDate(param)) {
    throw new Error(`Incorrect or missing ${name}: ${param}`);
  }
  return param;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

type PatientFields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation }: PatientFields): newPatientEntry => {
  const newEntry: newPatientEntry = {
    name: parseString(name, 'name'),
    dateOfBirth: parseDate(dateOfBirth, 'dateOfBirth'),
    ssn: parseString(ssn, 'ssn'),
    gender: parseGender(gender),
    occupation: parseString(occupation, 'occupation')
  };

  return newEntry;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isStringArray = (param: any[]): param is string[] => {
  return param.every(item => isString(item));
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<Diagnose['code']> => {
  if (!Array.isArray(diagnosisCodes) || !isStringArray(diagnosisCodes)) {
    throw new Error('Incorrect diagnosis codes: ' + diagnosisCodes);
  }

  return diagnosisCodes;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (param: any): param is EntryType => {
  return ['HealthCheck', 'OccupationalHealthcare', 'Hospital'].includes(param);
};

const parseType = (type: unknown): EntryType => {
  if (!type || !isEntryType(type)) {
    throw new Error('Incorrect or missing id: ' + type);
  }

  return type;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (rating === undefined|| !isHealthCheckRating(rating)) {
    throw new Error('Incorrect or missing health check rating: ' + rating);
  }
  return rating;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseSickLeave = (param: any): { startDate: string, endDate: string } => {
  return {
    startDate: parseString(param.startDate, 'sick leave start date'),
    endDate: parseString(param.endDate, 'sick leave end date')
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDischarge = (param: any): { date: string, criteria: string } => {
  if (!param) {
    throw new Error('Missing discharge');
  }
  return {
    date: parseDate(param.date, 'discharge date'),
    criteria: parseString(param.criteria, 'discharge criteria')
  };
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewEntry = (entry: any): NewEntry => {
  const newEntry: Omit<BaseEntry, 'id'> = {
    description: parseString(entry.description, 'description'),
    date: parseDate(entry.date, 'date'),
    specialist: parseString(entry.specialist, 'specialist'),
    diagnosisCodes: entry.diagnosisCodes
      ? parseDiagnosisCodes(entry.diagnosisCodes)
      : undefined
  };

  const type = parseType(entry.type);

  switch (type) {
    case 'HealthCheck':
      return {
        ...newEntry,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(entry.healthCheckRating)
      };
    case 'OccupationalHealthcare':
      return {
        ...newEntry,
        type: 'OccupationalHealthcare',
        employerName: parseString(entry.employerName, 'employerName'),
        sickLeave: entry.sickLeave
          ? parseSickLeave(entry.sickLeave)
          : undefined
      };
    case 'Hospital':
      return {
        ...newEntry,
        type: 'Hospital',
        discharge: parseDischarge(entry.discharge)
      };
    default:
      return assertNever(type);
  }
};

export default { toNewPatientEntry, toNewEntry };