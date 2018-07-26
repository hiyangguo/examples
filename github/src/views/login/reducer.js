import { fromJS } from 'immutable';
import * as ActionTypes from '@/constants/ActionTypes';
import { storeAsFormData } from '@/utils/actionToStore';
import createReducer from '@/redux/functions/createReducer';

const initialState = fromJS({
  formData: {}
});


export default createReducer(initialState, {
  [ActionTypes.LOGIN]: storeAsFormData('formData')
});

export function createSelectors(state) {
  const _state = state.getIn(['app', 'login']);
  return {
    loginData: () => _state.get('formData')
      .toJS()
  };
}
