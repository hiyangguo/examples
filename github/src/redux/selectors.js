import { createSelector } from 'reselect';
import { List } from 'immutable';

export const getAuthUser = state => state.getIn(['app', 'login']);
export const getError = state => state.getIn(['app', 'error']);
export const getLanguage = state => state.getIn(['app', 'language']);

export const getTags = state => state.getIn(['entities', 'tags']);
export const getTagsByIds = ids =>
  createSelector(
    [getTags],
    tags => {
      return List(ids).map(id => tags.get(id.toString()));
    }
  );


const selectRepos = state => state.getIn(['entities', 'repos']);
export const selectRepo = fullName =>
  createSelector(
    [selectRepos],
    repos => repos.get(fullName)
  );