import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { updateEntities } from '@/redux/modules/entities';
import { selectCommits, selectIssues, selectRepo, selectView } from '@/redux/selectors';
import ToJS from '@/hocs/ToJS';
import { normalize } from 'normalizr';
import * as Entity from '@/constants/Entities';
import IssueTable from '@/views/repo/issues/IssueTable';
import { bindActionCreators } from 'redux';
import { makeSetViewState } from '@/redux/modules/views';
import { fetchCommits, fetchIssues } from '@/redux/actions';

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
    return this.props.onFetchIssues({
      params: {
        sort: sortColumn.replace('_at', ''),
        direction: sortType,
      },
    })
      .finally(() => this.setState(() => ({ fetching: false })));
  }

  handleSort = (sortColumn, sortType) => this.setState({ sortColumn, sortType }, this.fetchIssues);

  render() {
    const { issues } = this.props;
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


function mapState2Props(state, { location }) {
  const viewState = selectView(state)(location.pathname);

  return {
    issues: selectIssues(state)(viewState.get('issues')),
  }
}

function mapDispatch2Props(dispatch, { location, params: { owner, name } }) {
  const actions = bindActionCreators({
    setViewState: makeSetViewState(location.pathname),
    fetchIssues
  }, dispatch);

  const onFetchIssues = params =>
    actions.fetchIssues(owner, name, params)
      .then(({ data }) => {
        actions.setViewState({
          issues: data
        });
      });

  return {
    onFetchIssues
  }
}

module.exports = connect(
  mapState2Props,
  mapDispatch2Props
)(ToJS(RepoIssues));
