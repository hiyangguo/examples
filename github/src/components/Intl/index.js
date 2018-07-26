import { injectIntl } from 'react-intl';

function Intl({ children, intl: { formatMessage } }) {
  const translator = children;
  const t = (id, values) => formatMessage({ id }, values);
  return translator(t);
}

export default injectIntl(Intl);
