import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { CardTypeIcon, HospitalEntry as EntryType } from '../types';
import DiagnosisList from './DiagnosisList';

const HospitalEntry: React.FC<{ entry: EntryType }> = ({ entry }) => {

  return (
    <Card fluid={true}>
      <Card.Content>
        <Card.Header>{entry.date} <Icon name={CardTypeIcon[entry.type]} size='large' /></Card.Header>
        <Card.Meta>{entry.description}</Card.Meta>
        <Card.Description>
          <div>
            <Icon name="user cancel" size="large" />
            {`Discharge reason: ${entry.discharge.criteria} Date: ${entry.discharge.date}`}
          </div>
          {entry.diagnosisCodes
            ? <DiagnosisList codes={entry.diagnosisCodes} />
            : null
          }
        </Card.Description>
      </Card.Content>
    </Card>
  );
};
export default HospitalEntry;