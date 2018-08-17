import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { List } from 'immutable';
import { updateEntities } from '@/redux/modules/entities';
import { selectCommits, selectRepo, selectView } from '@/redux/selectors';
import ToJS from '@/hocs/ToJS';
import { normalize } from 'normalizr';
import * as Entity from '@/constants/Entities';
import { makeSetViewState } from '@/redux/modules/views';
import CommitsHistory from '@/views/repo/commits/CommitsHistory';
import { Panel } from 'rsuite';
import CommitsTable from '@/views/repo/commits/CommitsTable';

class RepoCommits extends PureComponent {

  state = {
    fetching: false,

    sortColumn: 'created_at',
    sortType: 'desc',
  };

  componentDidMount() {
    this.fetchCommits();
  }

  fetchCommits() {
    const { sortColumn, sortType } = this.state;
    this.setState(() => ({ fetching: true }));
    return this.props.onFetchCommits({
      sort: sortColumn.replace('_at', ''),
      direction: sortType,
    })
      .finally(() => this.setState(() => ({ fetching: false })));
  }

  handleSort = (sortColumn, sortType) => this.setState({ sortColumn, sortType }, this.fetchCommits);

  render() {
    const { commits } = this.props;
    const { fetching, sortColumn, sortType } = this.state;
    return (
      <CommitsTable
        data={commits}
        loading={fetching}
      />
    );
  }
}

function mapState2Props(state, { location, params: { owner, name } }) {
  const viewState = selectView(state)(location.pathname);

  const commits = selectCommits(state)(viewState.get('commits', List()));

  return {
    commits,
    repository: selectRepo(owner, name)(state),
  }
}

function mapDispatch2Props(dispatch, { location, params: { owner, name, sha } }) {
  const setViewState = makeSetViewState(location.pathname);

  const onFetchCommits = params =>
    axios(`/repos/${owner}/${name}/commits`, { sha, ...params })
      .then((res) => {
        const { data } = res;
        const { result, entities } = normalize(data, [Entity.Commit]);
        dispatch(updateEntities(entities));

        dispatch(setViewState({
          commits: result
        }));

        return res;
      });


  return {
    dispatch,
    setViewState,
    onFetchCommits
  }
}

module.exports = connect(
  mapState2Props,
  mapDispatch2Props
)(ToJS(RepoCommits));
