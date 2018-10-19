import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import ToJS from '@/hocs/ToJS';
import { selectCommits, selectView } from '@/redux/selectors';
import { makeSetViewState } from '@/redux/modules/views';
import CommitsTable from '@/views/repo/commits/CommitsTable';
import { bindActionCreators } from 'redux';
import { fetchCommits } from '@/redux/actions';
import { Pagination } from 'rsuite';
import { getTableHeight } from '@/rsuite/Table';
import parseLinkHeader from 'parse-link-header';

class RepoCommits extends PureComponent {

  state = {
    fetching: false,
    currentPage: 1,
    lastPage: 1
  };

  componentDidMount() {
    this.fetchCommits();
  }

  fetchCommits(page = 1) {
    this.setState(() => ({ fetching: true }));
    return this.props.onFetchCommits({ page })
      .then(({ page }) => {
        if (page.last) {
          this.setState({ lastPage: +page.last.page });
        }
      })
      .finally(() => this.setState(() => ({ fetching: false })));
  }

  onPageChange = (page) => {
    this.fetchCommits(page)
      .then(() => this.setState({ currentPage: page }));
  };

  render() {
    const { commits } = this.props;
    const { fetching, currentPage, lastPage } = this.state;
    return (
      <Fragment>
        <CommitsTable
          data={commits}
          loading={fetching}
          height={getTableHeight() - 35}
        />
        <div style={{ textAlign: 'center' }}>
          <Pagination
            prev
            last
            next
            first
            ellipsis
            activePage={currentPage}
            maxButtons={5}
            boundaryLinks
            pages={lastPage}
            onSelect={this.onPageChange}
          />
        </div>
      </Fragment>
    );
  }
}

function mapState2Props(state, { location }) {
  const viewState = selectView(state)(location.pathname);

  return {
    commits: selectCommits(state)(viewState.get('commits'))
  };
}

function mapDispatch2Props(dispatch, { location, params: { owner, name, sha } }) {
  const actions = bindActionCreators({
    setViewState: makeSetViewState(location.pathname),
    fetchCommits
  }, dispatch);

  const onFetchCommits = params =>
    actions.fetchCommits(owner, name, sha, params)
      .then((res) => {
        const { data, headers } = res;
        actions.setViewState({
          commits: data
        });
        return {
          ...res,
          page: parseLinkHeader(headers.link)
        };
      });

  return {
    onFetchCommits
  };
}

module.exports = connect(
  mapState2Props,
  mapDispatch2Props
)(ToJS(RepoCommits));
