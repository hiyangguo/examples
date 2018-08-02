import { schema } from 'normalizr';

export const User = new schema.Entity('users', {}, {
  idAttribute: 'login',
  processStrategy(user, parent, key) {
    const route_path = `/${user.login}`;
    switch (key) {
      case 'owner':
        return { ...user, repos: [parent.full_name], route_path };
      default:
        return { ...user, route_path };
    }
  },
  mergeStrategy(userA, userB) {
    return {
      ...userA,
      ...userB,
      repos: [...(userA.repos || []), ...(userB.repos || [])],
    };
  },
});

export const Organization = new schema.Entity('orgs', {}, {
  idAttribute: 'login',
  processStrategy(org) {
    return {
      ...org,
      route_path: `/${org.login}`,
    }
  },
});

export const RepoOwner = new schema.Union({
  User,
  Organization,
}, 'type');

export const Issue = new schema.Entity('issues', {
  user: User,
}, {
  idAttribute(issue, repo) {
    return `${repo.full_name}#${issue.number}`;
  },
  processStrategy(issue, repo) {
    return {
      ...issue,
      route_path: `${repo.route_path}/issues/${issue.number}`,
    }
  },
});

export const Repository = new schema.Entity('repos', {
  owner: RepoOwner,
  organization: Organization,
}, {
  idAttribute: 'full_name',
  processStrategy(repo) {
    return {
      ...repo,
      route_path: `/${repo.full_name}`,
    }
  },
});

// custom
User.define({
  repos: [Repository],
});

Repository.define({
  issues: [Issue],
});