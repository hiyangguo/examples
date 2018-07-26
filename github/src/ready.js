/* eslint-disable consistent-return,array-callback-return,no-plusplus */
import axios from 'axios';
import { isIE } from '@/constants/BrowserConst';
import store from '@/redux';
import action from '@/redux/functions/action';
import { UPDATE_APP } from '@/redux/modules/app';

function loadJsFile(url, callback) {
  const s = document.createElement('script'),
    head = document.getElementsByTagName('head')[0];
  s.type = 'text/javascript';
  // 注意服务器返回的JS的编码需与这里的设置一致
  s.charset = 'utf-8';
  s.src = url;
  s.onload = () => {
    callback && callback();
  };
  head.insertBefore(s, head.firstChild);
  return s;
}

const filter = [];

/**
 * polyfill & es6-shim
 */
filter.push(new Promise((resolve) => {
  if (!isIE) {
    return resolve();
  }

  let count = 0;
  const files = [
    '/resources/js/es6-shim/0.35.1/es6-shim.min.js',
    '/resources/js/es6-shim/0.35.1/es6-sham.min.js',
    '/resources/js/polyfill.min-features-Intl-locale.en.js'
  ];

  // 异步加载CSS文件
  files.forEach((file) => {
    loadJsFile(file, () => {
      count++;
      if (count === files.length) {
        resolve();
      }
    });
  });
}));

// 获取用户信息
function fetchUser() {
  return axios('/user')
    .then(({ data }) => {
      store.dispatch(action(UPDATE_APP, { login: data }));
    });
}

export default function ready() {
  return fetchUser();
}
