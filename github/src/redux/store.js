import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { combineReducers } from 'redux-immutable';

import app from './modules/app';
import entities from './modules/entities';
import views from './modules/views';
import routing from './modules/routing';

const middlewares = [thunkMiddleware];

/**
 * Enable Redux devtools browser extension
 * @see https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup
 */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    app,
    entities,
    views,
    routing
  }),
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store;

export const dispatch = store.dispatch;
