import { schema } from 'normalizr';

export const User = new schema.Entity('users');
export const Organization = new schema.Entity('orgs');

export const RepoOwner = new schema.Union({
  User,
  Organization
}, 'type');

export const Repository = new schema.Entity('repos', {
  owner: RepoOwner
}, {
  idAttribute: 'full_name'
});

