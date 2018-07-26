import { DOMHelper } from 'rsuite';
import Layout from '@/common/Layout';
import store from '@/redux';
import action from '@/redux/functions/action';
import { UPDATE_APP } from '@/redux/modules/app';
import ready from '@/ready';
import { getAuthUser, getError } from '@/redux/selectors';

import login from './login/routes';

import Root from './index';
import Home from './home';
import Error404 from './error/404';
import Error500 from './error/500';

const { removeClass } = DOMHelper;

const routes = {
  component: Root,
  async onEnter(nextState, replace, callback) {
    try {
      await ready();
    } catch (e) {
      console.log(e);
      const { response: { status } } = e;
      store.dispatch(action(UPDATE_APP, { error: status }));
    } finally {
      removeClass(document.body, 'body-loading');
      callback();
    }
  },
  onChange() {
    store.dispatch(action(UPDATE_APP, { error: null }));
  },
  childRoutes: [
    login,
    {
      path: '/',
      getComponent: (nextState, cb) => {
        if (getError(store.getState())) {
          cb(null, Error500);
        } else {
          cb(null, Layout);
        }
      },
      indexRoute: {
        // title: null,
        // component: Home
        onEnter(_, replace) {
          replace('/rsuite/rsuite');
        }
      },
      childRoutes: [
        require('./repo/routes')
      ]
    },
    {
      path: '*',
      title: '页面不存在',
      component: Error404
    }
  ]
};

export default routes;
