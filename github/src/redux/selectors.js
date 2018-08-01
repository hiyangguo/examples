import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import * as Entity from '@/constants/Entities';

export const getAuthUser = state => state.getIn(['app', 'login']);
export const getError = state => state.getIn(['app', 'error']);
export const getLanguage = state => state.getIn(['app', 'language']);


const selectEntities = state => state.get('entities');

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