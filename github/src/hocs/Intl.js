import React from 'react';
import { injectIntl } from 'react-intl';

function intl(Component, injectAs = 't') {
  function IntlToT({ intl: { formatMessage, messages }, ...props }) {
    const injectProps = {
      [injectAs]: (id, values) => messages[id] ? formatMessage({ id }, values) : id
    };
    return (
      <Component {...injectProps} {...props} />
    );
  }

  return injectIntl(IntlToT);
}

export default intl;