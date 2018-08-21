// polyfills
import 'babel-polyfill';

import axios from 'axios';
import toQueryString from '@/utils/toQueryString';
import '@/utils/axios-mutex-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/App';

// axios setup
axios.defaults.baseURL = 'https://api.github.com';
axios.defaults.paramsSerializer = toQueryString;
axios.defaults.headers = {
  Accept: 'application/vnd.github.v3+json',
  Authorization: `token ${require('./access-token')}`
};

// 304 caching

axios.defaults.validateStatus = function(status) {
  return status >= 200 && status < 300 || status === 304;
};

const url2ETagMap = {};
const eTag2DataMap = {};

axios.interceptors.request.use(function(config) {
  if (url2ETagMap[config.url]) {
    config.headers['If-None-Match'] = url2ETagMap[config.url];
  }
  return config;
});

axios.interceptors.response.use(function(response) {
  if (response.status === 304) {
    return {
      ...response,
      data: eTag2DataMap[response.config.headers['If-None-Match']]
    };
  }

  if (response.status >= 200 && response.status < 300) {
    url2ETagMap[response.config.url.replace(response.config.baseURL, '')] = response.headers.etag;
    eTag2DataMap[response.headers.etag] = response.data;
  }
  return response;
});
// bootstrap React App
ReactDOM.render(<App />, document.getElementById('root'));
