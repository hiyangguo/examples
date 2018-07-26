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

// bootstrap React App
ReactDOM.render(<App />, document.getElementById('root'));
