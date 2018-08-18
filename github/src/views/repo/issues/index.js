import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { Button, Dropdown } from 'rsuite';
import { selectIssues, selectView } from '@/redux/selectors';
import ToJS from '@/hocs/ToJS';
import IssueTable from '@/views/repo/issues/IssueTable';
import { bindActionCreators } from 'redux';
import { makeSetViewState } from '@/redux/modules/views';
import { fetchRepoIssues } from '@/redux/actions';
import TableToolbar from '@/components/TableToolbar';
import DropdownInput from '@/components/DropdownInput';
import RadioButtonGroup from '@/components/RadioButtonGroup';

class RepoIssues extends PureComponent {

  state = {
    fetching: false,

    sortColumn: 'created_at',
    sortType: 'desc',

    filterKey: '',
    filterValue: '',

    filterState: 'open'
  };

  componentDidMount() {
    this.fetchIssues();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.key !== this.props.location.key) {
      this.fetchIssues();
    }
  }

  getFilterParams() {
    const { filterKey, filterValue } = this.state;
    if (!filterKey) return null;
    return {
      [filterKey]: filterValue,
    };
  }

  fetchIssues() {
    this.setState(() => ({ fetching: true }));

    return this.props.onFetchIssues({
      state: this.state.filterState,
      sort: this.state.sortColumn.replace('_at', ''),
      direction: this.state.sortType,

      ...this.getFilterParams()
    })
      .finally(() => this.setState(() => ({ fetching: false })));
  }

  handleSort = (sortColumn, sortType) => this.setState({ sortColumn, sortType }, this.fetchIssues);

  handleSelectFilterKey = filterKey => this.setState({ filterKey }, () => this.state.filterValue && this.fetchIssues());
  handleInputFilterValue = filterValue => this.setState({ filterValue });

  handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.fetchIssues();
    }
  };

  handleFilterState = filterState => this.setState({ filterState }, this.fetchIssues);
  handleFilterAuthor = login => this.setState({ filterKey: 'creator', filterValue: login }, this.fetchIssues);

  renderTableToolbar() {
    return (
      <TableToolbar>
        <div style={{ flexGrow: 1 }}>
          <RadioButtonGroup
            activeKey={this.state.filterState}
            onSelect={this.handleFilterState}
          >
            <Button eventKey="all">All</Button>
            <Button eventKey="open">Open</Button>
            <Button eventKey="closed">Closed</Button>
          </RadioButtonGroup>
        </div>
        <DropdownInput
          title="Filter"
          placeholder="Search all issues"
          style={{ width: 300 }}
          activeKey={this.state.filterKey}
          onSelect={this.handleSelectFilterKey}
          value={this.state.filterValue}
          onChange={this.handleInputFilterValue}
          onKeyDown={this.handleKeyDown}
        >
          <Dropdown.Item eventKey="assignee">Assignee</Dropdown.Item>
          <Dropdown.Item eventKey="creator">Author</Dropdown.Item>
          <Dropdown.Item eventKey="mentioned">Mentioned</Dropdown.Item>
        </DropdownInput>
      </TableToolbar>
    );
  }

  render() {
    const { issues } = this.props;
    const { fetching, sortColumn, sortType } = this.state;
    return (
      <Fragment>
        {this.renderTableToolbar()}
        <IssueTable
          loading={fetching}
          data={issues}
          sortColumn={sortColumn}
          sortType={sortType}
          onSortColumn={this.handleSort}
          onClickAuthor={this.handleFilterAuthor}
        />
      </Fragment>
    );
  }
}


function mapState2Props(state, { location }) {
  const viewState = selectView(state)(location.pathname);

  return {
    key: location.pathname,
    issues: selectIssues(state)(viewState.get('issues')),
  }
}

function mapDispatch2Props(dispatch, { location, params: { owner, name }, route }) {
  const actions = bindActionCreators({
    setViewState: makeSetViewState(location.pathname),
    fetchRepoIssues
  }, dispatch);

  const onFetchIssues = params =>
    actions.fetchRepoIssues(owner, name, { type: route.path, ...params })
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
