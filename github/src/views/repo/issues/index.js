import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Table, Icon } from 'rsuite';
import { updateEntities } from '@/redux/modules/entities';
import { selectRepo } from '@/redux/selectors';
import ToJS from '@/hocs/ToJS';
import { normalize } from 'normalizr';
import * as Entity from '@/constants/Entities';
import { Link } from 'react-router';

const { Column, HeaderCell, Cell } = Table;


function IssueTitleCell({ rowData, dataKey = 'title', ...props }) {
  const { title } = rowData;
  return (
    <Cell {...props}>
      <Link to={rowData.route_path}>{title}</Link>
    </Cell>
  );
}


function IssueCommentsCell({ rowData, dataKey = 'comments', ...props }) {
  const { comments } = rowData;
  return (
    <Cell {...props}>
      {
        comments > 0 &&
        <Link to={rowData.route_path}>
          <Icon icon="comment-o" fixedWidth />
          {comments}
        </Link>
      }
    </Cell>
  );
}


class RepoIssues extends PureComponent {
  componentDidMount() {
    this.fetchIssues();
  }

  fetchIssues() {
    const { dispatch, params: { owner, name } } = this.props;
    return axios(`/repos/${owner}/${name}/issues`)
      .then(({ data }) => {
        const { entities } = normalize({ full_name: `${owner}/${name}`, issues: data }, Entity.Repository);
        dispatch(updateEntities(entities));
      });
  }

  render() {
    const { repository: { issues = [] } } = this.props;
    return (
      <Table data={issues}>
        <Column flexGrow={1}>
          <HeaderCell>Title</HeaderCell>
          <IssueTitleCell dataKey="title" />
        </Column>
        <Column width={180} align="right">
          <HeaderCell>Comments</HeaderCell>
          <IssueCommentsCell dataKey="comments" />
        </Column>
      </Table>
    );
  }
}

module.exports = connect(
  (state, { params: { owner, name } }) => ({
    repository: selectRepo(owner, name)(state),
  }),
)(ToJS(RepoIssues));
