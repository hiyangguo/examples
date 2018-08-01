import React from 'react';
import { Provider, connect } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router } from 'react-router';
import { IntlProvider, addLocaleData } from 'react-intl';
import zh from 'react-intl/locale-data/zh';
import en from 'react-intl/locale-data/en';

import hashHistory from '@/constants/History';
import routes from '@/views/routes';
import locales from '@/locales';
import store from '@/redux';
import { getLanguage } from '@/redux/selectors';

import '@/less/index.less';

const history = syncHistoryWithStore(hashHistory, store, {
  selectLocationState(state) {
    return state.get('routing')
      .toJS();
  },
});
addLocaleData([...zh, ...en]);


const IntlApp = connect(
  state => ({
    language: getLanguage(state),
  }),
)(function IntlApp({ language }) {
  return (
    <IntlProvider locale={language} messages={locales[language]}>
      <Router history={history} routes={routes} />
    </IntlProvider>
  );
});

function App() {

  return (
    <Provider store={store}>
      <IntlApp />
    </Provider>
  );
}

export default App;
