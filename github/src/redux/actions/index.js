import axios from 'axios';
import { normalize } from 'normalizr';
import * as Entity from '@/constants/Entities';
import { updateEntities } from '@/redux/modules/entities';

export function fetchCommits(owner, name, sha, params) {
  return dispatch =>
    axios(`/repos/${owner}/${name}/commits`, { params: { sha, ...params } })
      .then((res) => {
        const { data } = res;
        const { result, entities } = normalize({ full_name: `${owner}/${name}`, commits: data }, Entity.Repository);
        dispatch(updateEntities(entities));

        return {
          ...res,
          data: entities[Entity.Repository.key][result].commits
        };
      })
}

export function fetchIssues(owner, name, params) {
  return dispatch =>
    axios(`/repos/${owner}/${name}/issues`, { params })
      .then((res) => {
        const { data } = res;
        const { result, entities } = normalize({ full_name: `${owner}/${name}`, issues: data }, Entity.Repository);
        dispatch(updateEntities(entities));

        return {
          ...res,
          data: entities[Entity.Repository.key][result].issues
        };
      })
}