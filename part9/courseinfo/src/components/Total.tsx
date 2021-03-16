import React from 'react';
import { CoursePart, CourseParts } from '../types';

const Total = ({ parts }: CourseParts): JSX.Element => {
  const number: number = parts.reduce(
    (carry: number, part: CoursePart): number =>
      carry + part.exerciseCount, 0
  );

  return (
    <div>
      {`Number of exercises: ${number}`}
    </div>
  );
};

export default Total;