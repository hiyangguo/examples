import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import _memorize from 'lodash/memoize';
import * as Entity from '@/constants/Entities';
import { Map } from 'immutable';

export const getAuthUser = state => state.getIn(['app', 'login']);
export const getError = state => state.getIn(['app', 'error']);
export const getLanguage = state => state.getIn(['app', 'language']);


const selectEntities = state => state.get('entities');

export const selectUser = (login) =>
  createSelector(
    [selectEntities],
    entities => denormalize(login, Entity.User, entities),
  );
export const selectRepo = (owner, name) =>
  createSelector(
    [selectEntities],
    entities => denormalize(`${owner}/${name}`, Entity.Repository, entities),
  );

export const selectIssue = (owner, name, number) =>
  createSelector(
    [selectEntities],
    entities => denormalize(`${owner}/${name}#${number}`, Entity.Issue, entities),
  );

export const selectCommits = createSelector(
  state => state.get('entities'),
  entities => _memorize(
    ids => denormalize(ids, [Entity.Commit], entities)
  )
);

export const selectView = createSelector(
  state => state.get('views'),
  views => _memorize(
    pathname => views.get(pathname, Map())
  )
);
