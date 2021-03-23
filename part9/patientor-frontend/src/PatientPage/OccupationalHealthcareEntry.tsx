import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { CardTypeIcon, OccupationalHealthCareEntry as EntryType } from '../types';
import DiagnosisList from './DiagnosisList';

const OccupationalHealthCareEntry: React.FC<{ entry: EntryType }> = ({ entry }) => {

  return (
    <Card fluid={true}>
      <Card.Content>
        <Card.Header>
          {entry.date}
          <Icon name={CardTypeIcon[entry.type]} size='large' />
          {entry.employerName}
        </Card.Header>
        <Card.Meta>{entry.description}</Card.Meta>
        <Card.Description>
          {entry.sickLeave && (
            <div>
              <Icon name="wpforms" size="large" />
              {`Sick leave from: ${entry.sickLeave?.startDate} to: ${entry.sickLeave?.endDate}`}
            </div>
          )}
          {entry.diagnosisCodes
            ? <DiagnosisList codes={entry.diagnosisCodes} />
            : null
          }
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default OccupationalHealthCareEntry;