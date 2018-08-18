import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import _memorize from 'lodash/memoize';
import * as Entity from '@/constants/Entities';
import { Map, List } from 'immutable';

export const getAuthUser = state => state.getIn(['app', 'login']);
export const getError = state => state.getIn(['app', 'error']);
export const getLanguage = state => state.getIn(['app', 'language']);


const selectEntities = state => state.get('entities');

export const selectUser = createSelector(
  selectEntities,
  entities => _memorize(
    login => denormalize(login, Entity.User, entities)
  ),
);

export const selectRepo = createSelector(
  state => state.get('entities'),
  entities => _memorize(
    (owner, name) => denormalize(`${owner}/${name}`, Entity.Repository, entities)
  )
);

export const selectIssue = createSelector(
  state => state.get('entities'),
  entities => _memorize(
    id => denormalize(id, Entity.Issue, entities)
  )
);

export const selectIssues = createSelector(
  state => state.get('entities'),
  entities => _memorize(
    (ids = List()) => denormalize(ids, [Entity.Issue], entities)
  )
);

export const selectCommits = createSelector(
  state => state.get('entities'),
  entities => _memorize(
    (ids = List()) => denormalize(ids, [Entity.Commit], entities)
  )
);

export const selectView = createSelector(
  state => state.get('views'),
  views => _memorize(
    pathname => views.get(pathname, Map())
  )
);
