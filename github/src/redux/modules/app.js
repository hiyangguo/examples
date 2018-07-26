import { createBasicImmutableReducer } from '@/redux/functions/createReducer';

const initialState = {
  login: null,
  error: null,
  language: navigator.language
};

export const UPDATE_APP = 'UPDATE_APP';

export default createBasicImmutableReducer(UPDATE_APP, initialState);
