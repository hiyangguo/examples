import React from 'react';
import env from '@/utils/env';
import curriedPrefix from '@/utils/prefix';

const prefix = curriedPrefix('product-logo');

class Component extends React.Component {
  static get displayName() {
    return 'ProductLogo';
  }

  render() {
    return (
      <div className={prefix('wrap')}>
        <img className={prefix('pic')} height={20} src={env('productLogoUrl')} alt="" />
        <span className={prefix('text')}>{env('appName')}</span>
      </div>
    );
  }
}

export default Component;
