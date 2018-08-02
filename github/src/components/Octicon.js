import React from 'react'
import GHOcticon, { getIconByName } from '@githubprimer/octicons-react'

function Octicon({ name, className, ...props }) {
  return (
    <i className="rs-icon" style={{ display: 'inline-block', width: 16, textAlign: 'center' }}>
      <GHOcticon {...props} icon={getIconByName(name)} />
    </i>
  );
}

export default Octicon;