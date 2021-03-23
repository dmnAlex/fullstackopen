import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { CardTypeIcon, HealthCheckEntry as EntryType } from '../types';
import DiagnosisList from './DiagnosisList';
import { SemanticCOLORS } from 'semantic-ui-react';

const HealthCheckEntry: React.FC<{ entry: EntryType }> = ({ entry }) => {
  const ratingToColor: SemanticCOLORS[] = [
    "green",
    "yellow",
    "orange",
    "red"
  ];


  return (
    <Card fluid={true}>
      <Card.Content>
        <Card.Header>{entry.date} <Icon name={CardTypeIcon[entry.type]} size='large' /></Card.Header>
        <Card.Meta>{entry.description}</Card.Meta>
        <Card.Description>
          {entry.diagnosisCodes
            ? <DiagnosisList codes={entry.diagnosisCodes} />
            : null
          }
          <Icon name="heart" color={ratingToColor[entry.healthCheckRating]} />
        </Card.Description>
      </Card.Content>
    </Card>
  );
};


export default HealthCheckEntry;