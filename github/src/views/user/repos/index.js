import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ToJS from '@/hocs/ToJS';
import { selectRepos, selectView } from '@/redux/selectors';
import RepoTable from '@/views/user/repos/RepoTable';
import { bindActionCreators } from 'redux';
import { makeSetViewState } from '@/redux/modules/views';
import { fetchUserRepos } from '@/redux/actions';

class UserRepos extends PureComponent {

  state = {
    fetching: false,

    sortColumn: 'updated_at',
    sortType: 'desc',
  };

  componentDidMount() {
    this.fetchUserRepos();
  }

  fetchUserRepos() {
    this.setState(() => ({ fetching: true }));
    return this.props.onFetchRepos({
      sort: this.state.sortColumn.replace('_at', ''),
      direction: this.state.sortType,
    })
      .finally(() => this.setState(() => ({ fetching: false })));
  }

  handleSort = (sortColumn, sortType) => this.setState({ sortColumn, sortType }, this.fetchUserRepos);

  render() {
    return (
      <div>
        <RepoTable
          loading={this.state.fetching}
          data={this.props.repos}
          sortColumn={this.state.sortColumn}
          sortType={this.state.sortType}
          onSortColumn={this.handleSort}
        />
      </div>
    );
  }
}


function mapState2Props(state, { location }) {
  const viewState = selectView(state)(location.pathname);

  return {
    repos: selectRepos(state)(viewState.get('repos')),
  }
}

function mapDispatch2Props(dispatch, { location, params: { login } }) {
  const actions = bindActionCreators({
    setViewState: makeSetViewState(location.pathname),
    fetchUserRepos
  }, dispatch);

  const onFetchRepos = params =>
    actions.fetchUserRepos(login, params)
      .then(({ data }) => {
        actions.setViewState({
          repos: data
        });
      });

  return {
    onFetchRepos
  }
}

export default withRouter(connect(
  mapState2Props,
  mapDispatch2Props
)(ToJS(UserRepos)));
