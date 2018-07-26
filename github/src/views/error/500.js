import React from 'react';
import PageError from './Error';

function Error500() {
  return (
    <div className="page-content">
      <PageError code="500" />
    </div>
  );
}

export default Error500;
