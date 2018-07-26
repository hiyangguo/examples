import createReducer from '@/redux/functions/createReducer';
import { fromJS } from 'immutable';

const initialState = {
  tags: {},
  users: {},
  orgs: {},
  repos: {}
};

export const UPDATE_ENTITIES = 'UPDATE_ENTITIES';

export default createReducer(fromJS(initialState), {
  [UPDATE_ENTITIES]: (state, { payload }) => state.mergeDeep(payload)
});

export function updateEntities(entities) {
  return {
    type: UPDATE_ENTITIES,
    payload: entities
  }
}
