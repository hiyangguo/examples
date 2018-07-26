import React from 'react';
import PageError from './Error';

function Error404() {
  return (
    <div className="page-content">
      <PageError code="404" />
    </div>
  );
}

export default Error404;
