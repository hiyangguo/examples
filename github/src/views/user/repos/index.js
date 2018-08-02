import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router';
import { normalize } from 'normalizr';
import * as Entity from '@/constants/Entities';
import { updateEntities } from '@/redux/modules/entities';
import ToJS from '@/hocs/ToJS';
import { selectUser } from '@/redux/selectors';
import RepoTable from '@/views/user/repos/RepoTable';

class UserRepos extends PureComponent {

  componentDidMount() {
    this.fetchUserRepos();
  }

  fetchUserRepos() {
    const { params: { login }, dispatch } = this.props;
    return axios(`/users/${login}/repos`, {
      params: {
        sort: 'updated',
        direction: 'desc',
      },
    })
      .then(({ data }) => {
        const { entities } = normalize(data, [Entity.Repository]);
        dispatch(updateEntities(entities));
      });
  }

  render() {
    const { user: { repos = [] } } = this.props;
    return (
      <div>
        <RepoTable data={repos} />
      </div>
    );
  }
}

export default withRouter(connect(
  (state, { params: { login } }) => ({
    user: selectUser(login)(state),
  }),
)(ToJS(UserRepos)));
