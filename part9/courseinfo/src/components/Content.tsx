import React from 'react';
import { CoursePart, CourseParts } from '../types';

const Content = ({ parts }: CourseParts): JSX.Element => {
  return (
    <div>
      {parts.map((part: CoursePart, index: number): JSX.Element =>
        <p key={index}>
          {part.name} {part.exerciseCount}
        </p>)}
    </div>
  );
};

export default Content;