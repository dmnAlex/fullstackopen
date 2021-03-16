import React from 'react';
import { CoursePart } from '../types';

const Total = ({ courseParts }: { courseParts: CoursePart[] }): JSX.Element => {
  const number: number = courseParts.reduce(
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