import React, { PureComponent } from 'react';
import { Icon } from 'rsuite';
import { Link, routerShape } from 'react-router';
import moment from 'moment';
import _get from 'lodash/get';
import { Table } from '@/rsuite';

const { Column, HeaderCell, Cell } = Table;

function IssueTitleCell({ rowData, dataKey = 'title', onClickAuthor, ...props }) {
  const { title, number, user: { login } } = rowData;
  return (
    <Cell {...props}>
      <Link to={rowData.route_path}>{title}</Link>
      <p>
        <small>#{number} by <Link role="button" onClick={() => onClickAuthor(login)}>{login}</Link></small>
      </p>
    </Cell>
  );
}

function DateCell({ rowData, dataKey, ...props }) {
  const date = _get(rowData, dataKey);
  return (
    <Cell {...props}>
      {moment(date).format('ll')}
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

function IssueTable({ onClickAuthor, ...props }) {
  return (
    <Table rowHeight={66} {...props}>
      <Column flexGrow={1}>
        <HeaderCell>Title</HeaderCell>
        <IssueTitleCell dataKey="title" onClickAuthor={onClickAuthor} />
      </Column>
      <Column width={120} align="right" sortable>
        <HeaderCell>Created at</HeaderCell>
        <DateCell dataKey="created_at" />
      </Column>
      <Column width={120} align="right" sortable>
        <HeaderCell>Updated at</HeaderCell>
        <DateCell dataKey="updated_at" />
      </Column>
      <Column width={120} align="right" sortable>
        <HeaderCell>Comments</HeaderCell>
        <IssueCommentsCell dataKey="comments" />
      </Column>
    </Table>
  )
}

export default IssueTable;
