import createReducer from '@/redux/functions/createReducer';
import { fromJS } from 'immutable';

const initialState = {
  users: {},
  orgs: {},
  repos: {},
  issues: {},
  commits: {}
};

export const UPDATE_ENTITIES = 'UPDATE_ENTITIES';

export default createReducer(fromJS(initialState), {
  [UPDATE_ENTITIES]: (state, { payload }) => state.mergeWith((oldVal, newVal) => oldVal.mergeWith((o, n) => o.merge(n), newVal), payload),
});

export function updateEntities(entities) {
  return {
    type: UPDATE_ENTITIES,
    payload: entities,
  }
}
