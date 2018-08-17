import { fromJS } from 'immutable';

/**
 * { [pathname]: State }
 */
const initialState = fromJS({});

const UPDATE_VIEW_STATE = 'SET_VIEW_STATE';

export function setViewState(pathname, nextState) {
  return dispatch => dispatch({ type: UPDATE_VIEW_STATE, payload: { pathname, nextState } });
}

export function makeSetViewState(pathname) {
  return nextState => setViewState(pathname, nextState);
}

function setState(state, nextState) {
  return state ? state.merge(nextState) : fromJS(nextState);
}

export default function reducer(state = initialState, { type, payload: { pathname, nextState } = {} }) {
  switch (type) {
    case UPDATE_VIEW_STATE:
      return pathname ? state.set(pathname, setState(state.get(pathname), nextState)) : state;
    default:
      return state;
  }
}
