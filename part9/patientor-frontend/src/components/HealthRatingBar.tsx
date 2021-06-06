import React from 'react';
import { Popup, Rating } from 'semantic-ui-react';

type BarProps = {
  rating: number;
  showText: boolean;
};

const HEALTHBAR_TEXTS = [
  'The patient is in great shape',
  'The patient has a low risk of getting sick',
  'The patient has a high risk of getting sick',
  'The patient has a diagnosed condition',
];

const HealthRatingBar = ({ rating, showText }: BarProps) => {
  return (
    <div className="health-bar">
      <Popup content={showText ? <p>{HEALTHBAR_TEXTS[rating]}</p> : 'desctriptions turned off'} trigger={<Rating icon="heart" disabled rating={4 - rating} maxRating={4} />} />
    </div>
  );
};

export default HealthRatingBar;
