import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { updateEntities } from '@/redux/modules/entities';
import { selectRepo } from '@/redux/selectors';
import ToJS from '@/hocs/ToJS';
import { normalize } from 'normalizr';
import * as Entity from '@/constants/Entities';
import IssueTable from '@/views/repo/issues/IssueTable';

class RepoIssues extends PureComponent {

  state = {
    fetching: false,

    sortColumn: 'created_at',
    sortType: 'desc',
  };

  componentDidMount() {
    this.fetchIssues();
  }

  fetchIssues() {
    const { dispatch, params: { owner, name } } = this.props;
    const { sortColumn, sortType } = this.state;
    this.setState(() => ({ fetching: true }));
    return axios(`/repos/${owner}/${name}/pulls`, {
      params: {
        sort: sortColumn.replace('_at', ''),
        direction: sortType,
      },
    })
      .then(({ data }) => {
        const { entities } = normalize({ full_name: `${owner}/${name}`, issues: data }, Entity.Repository);
        dispatch(updateEntities(entities));
      })
      .finally(() => this.setState(() => ({ fetching: false })));
  }

  handleSort = (sortColumn, sortType) => this.setState({ sortColumn, sortType }, this.fetchIssues);

  render() {
    const { repository: { issues = [] } } = this.props;
    const { fetching, sortColumn, sortType } = this.state;
    return (
      <IssueTable
        loading={fetching}
        data={issues}
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={this.handleSort}
      />
    );
  }
}

module.exports = connect(
  (state, { params: { owner, name } }) => ({
    repository: selectRepo(state)(owner, name),
  }),
)(ToJS(RepoIssues));
