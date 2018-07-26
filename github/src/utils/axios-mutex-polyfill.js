import axios, { CancelToken } from 'axios';

const mutexes = {};
let mutexId = 1;

const createMutex = () => mutexId++;

axios.interceptors.request.use((config) => {
  if (config.mutex) {
    let source = mutexes[config.mutex];

    if (source) {
      source.cancel();
    }
    source = CancelToken.source();
    mutexes[config.mutex] = source;
    config.cancelToken = source.token;
  }
  return config;
});

export {
  createMutex
};
