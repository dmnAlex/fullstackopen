import React from 'react';
import { useStateValue } from '../state';
import { Diagnose } from '../types';

const DiagnosisList: React.FC<{ codes: Array<Diagnose['code']> }> = ({ codes }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <ul>
      {codes.map((code: Diagnose['code'], index: number) =>
        <li key={index}>{code} {diagnoses[code] && diagnoses[code].name}</li>
      )}
    </ul>
  );
};

export default DiagnosisList;