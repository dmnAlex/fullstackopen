import React from 'react';
import { CardType, Entry } from '../types';
import HealthCheckEntry from './HealthCheckEntry';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthCareEntry from './OccupationalHealthcareEntry';

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discrimination union member: ${JSON.stringify(value)}`
    );
  };

  switch (entry.type) {
    case CardType.Hospital:
      return <HospitalEntry entry={entry} />;
    case CardType.HealthCheck:
      return <HealthCheckEntry entry={entry} />;
    case CardType.OccupationalHealthcare:
      return <OccupationalHealthCareEntry entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;