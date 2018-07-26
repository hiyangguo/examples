import React from 'react';
import { Provider, connect } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router } from 'react-router';
import { IntlProvider, addLocaleData } from 'react-intl';
import zh from 'react-intl/locale-data/zh';
import en from 'react-intl/locale-data/en';
import { IntlProvider as RsIntlProvider } from 'rsuite';
import zhCN from 'rsuite/lib/IntlProvider/locales/zh_CN';
import enUS from 'rsuite/lib/IntlProvider/locales/en_US';

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
  }
});
addLocaleData([...zh, ...en]);

const localeMap = {
  'zh-CN': zhCN,
  'en-US': enUS
};

const IntlApp = connect(
  state => ({
    language: getLanguage(state)
  })
)(function IntlApp({ language }) {
  return (
    <IntlProvider locale={language} messages={locales[language]}>
      <RsIntlProvider locale={localeMap[language]}>
        <Router history={history} routes={routes} />
      </RsIntlProvider>
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
