import axios from 'axios';
import { normalize } from 'normalizr';
import * as Entity from '@/constants/Entities';
import { updateEntities } from '@/redux/modules/entities';

export function fetchUser(login, params) {
  return dispatch => axios(`/users/${login}`, { params })
    .then((res) => {
      const { data } = res;
      const { result, entities } = normalize(data, Entity.User);
      dispatch(updateEntities(entities));

      return {
        ...res,
        data: result
      };
    });
}

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
      });
}

export function fetchRepo(owner, name, params) {
  return dispatch => axios(`/repos/${owner}/${name}`, { params })
    .then((res) => {
      const { data } = res;
      const { result, entities } = normalize(data, Entity.Repository);
      dispatch(updateEntities(entities));

      return {
        ...res,
        data: result
      };
    });
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
      });
}

export function fetchCommit(owner, repo, sha) {
  return dispatch =>
    axios(`/repos/${owner}/${repo}/commits/${sha}`)
      .then((res) => {
        const { data } = res;
        const { result, entities } = normalize({ full_name: `${owner}/${repo}`, commits: [data] }, Entity.Repository);
        dispatch(updateEntities(entities));

        return {
          ...res,
          data: `${owner}/${repo}@${sha.substring(0, 7)}`
        };
      });
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
      });
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
      });
}