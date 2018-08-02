import React, { Fragment } from 'react';
import Repos from './repos';

function UserProfile({ location: { query: { tab } } }) {
  return (
    <Fragment>
      {
        tab === 'repositories' &&
        <Repos />
      }
    </Fragment>
  );
}

module.exports = UserProfile;
