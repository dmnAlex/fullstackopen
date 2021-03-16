import React from 'react';

const Header = ({ title }: { title: string }): JSX.Element => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

export default Header;