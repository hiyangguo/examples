import React from 'react'
import classnames from 'classnames';
import GHOcticon, { getIconByName } from '@githubprimer/octicons-react'

function Octicon({ name, className, style, ...props }) {
  return (
    <i
      className={classnames('rs-icon', className)}
      style={{ display: 'inline-block', width: 16, textAlign: 'center', ...style }}
    >
      <GHOcticon {...props} icon={getIconByName(name)} />
    </i>
  );
}

export default Octicon;