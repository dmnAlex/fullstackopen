import React from 'react';
import { CoursePart } from '../types';

const Part = ({ part }: { part: CoursePart }) => {
  const assertNever = (value: never): never => {
    throw new Error(`Unhandled discrimination union member: ${JSON.stringify(value)}`);
  };
  const header: JSX.Element = <div><b>{part.name} {part.exerciseCount}</b></div>;

  switch (part.type) {
    case 'normal':
      return (
        <div>
          {header}
          <div><i>{part.description}</i></div>
        </div>
      );
    case 'groupProject':
      return (
        <div>
          {header}
          <div>{`project exercises ${part.groupProjectCount}`}</div>
        </div>
      );
    case 'submission':
      return (
        <div>
          {header}
          <div><i>{part.description}</i></div>
          <div>{`submit to ${part.exerciseSubmissionLink}`}</div>
        </div>
      );
    case 'special':
      return (
        <div>
          {header}
          <div><i>{part.description}</i></div>
          <div>{`required skills: ${part.requirements.join(', ')}`}</div>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;