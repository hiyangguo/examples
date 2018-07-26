import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import env from '@/utils/env';
import intl from '@/hocs/Intl';

function Root({ t, routes, children }) {
  const documentTitle = () => {
    let title = routes.reduce((currentTitle, { title = currentTitle }) => title, '');
    return title ? `${t(title)} - ${env('appName')}` : env('appName');
  };

  return (
    <Fragment>
      <Helmet>
        <title>{documentTitle()}</title>
      </Helmet>
      {children}
    </Fragment>
  );
}

export default intl(Root);
