import { schema } from 'normalizr';

export const User = new schema.Entity('users', {}, {
  idAttribute: 'login',
}, {
  processStrategy(user) {
    return {
      ...user,
      route_path: `/${user.login}`,
    }
  },
});

export const Organization = new schema.Entity('orgs', {}, {
  idAttribute: 'login',
}, {
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

  // custom
  issues: [Issue],
}, {
  idAttribute: 'full_name',
  processStrategy(repo) {
    return {
      ...repo,
      route_path: `/${repo.full_name}`,
    }
  },
});
