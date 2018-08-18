import axios from 'axios';
import { normalize } from 'normalizr';
import * as Entity from '@/constants/Entities';
import { updateEntities } from '@/redux/modules/entities';

export function fetchUserRepos(login, params) {
  return dispatch =>
    axios(`/users/${login}/repos`, { params })
      .then((res) => {
        const { data } = res;
        const { result, entities } = normalize({ login, repos: data }, Entity.User);
        dispatch(updateEntities(entities));

        return {
          ...res,
          data: entities[Entity.User.key][result].repos
        };
      })
}

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

export function fetchRepoIssues(owner, name, { type = 'issues', ...params }) {
  return dispatch =>
    axios(`/repos/${owner}/${name}/issues`, { params })
      .then((res) => {
        const { data } = res;
        const { result, entities } = normalize({
          full_name: `${owner}/${name}`,
          issues: data.filter(item => !item.pull_request),
          pulls: data.filter(item => item.pull_request)
        }, Entity.Repository);
        dispatch(updateEntities(entities));

        return {
          ...res,
          data: entities[Entity.Repository.key][result][type]
        };
      })
}

export function fetchRepoPulls(owner, name, params) {
  return dispatch =>
    axios(`/repos/${owner}/${name}/pulls`, { params })
      .then((res) => {
        const { data } = res;
        const { result, entities } = normalize({
          full_name: `${owner}/${name}`,
          pulls: data
        }, Entity.Repository);
        dispatch(updateEntities(entities));

        return {
          ...res,
          data: entities[Entity.Repository.key][result].pulls
        };
      })
}