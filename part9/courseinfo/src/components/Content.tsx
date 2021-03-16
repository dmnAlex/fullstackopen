import React from 'react';
import { CoursePart } from '../types';
import Part from './Part';

const Content = ({ courseParts }: { courseParts: CoursePart[] }): JSX.Element => {
  return (
    <div>
      {courseParts.map((part: CoursePart, index: number): JSX.Element =>
        <Part key={index} part={part} />
      )}
    </div>
  );
};

export default Content;