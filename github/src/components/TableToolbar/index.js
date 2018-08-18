import React from 'react';
import classnames from 'classnames';
import './index.less';

function Index({ className, ...props }) {
  return (
    <div className={classnames('table-toolbar', className)} {...props} />
  );
}

export default Index;
