import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ToJS from '@/hocs/ToJS';
import { selectCommits, selectView } from '@/redux/selectors';
import { makeSetViewState } from '@/redux/modules/views';
import CommitsTable from '@/views/repo/commits/CommitsTable';
import { bindActionCreators } from 'redux';
import { fetchCommits } from '@/redux/actions';

class RepoCommits extends PureComponent {

  state = {
    fetching: false,
  };

  componentDidMount() {
    this.fetchCommits();
  }

  fetchCommits() {
    this.setState(() => ({ fetching: true }));
    return this.props.onFetchCommits()
      .finally(() => this.setState(() => ({ fetching: false })));
  }

  render() {
    const { commits } = this.props;
    const { fetching } = this.state;
    return (
      <CommitsTable
        data={commits}
        loading={fetching}
      />
    );
  }
}

function mapState2Props(state, { location }) {
  const viewState = selectView(state)(location.pathname);

  return {
    commits: selectCommits(state)(viewState.get('commits')),
  }
}

function mapDispatch2Props(dispatch, { location, params: { owner, name, sha } }) {
  const actions = bindActionCreators({
    setViewState: makeSetViewState(location.pathname),
    fetchCommits
  }, dispatch);

  const onFetchCommits = params =>
    actions.fetchCommits(owner, name, sha, params)
      .then(({ data }) => {
        actions.setViewState({
          commits: data
        });
      });

  return {
    onFetchCommits
  }
}

module.exports = connect(
  mapState2Props,
  mapDispatch2Props
)(ToJS(RepoCommits));
