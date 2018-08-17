import React from 'react';
import { Icon } from 'rsuite';
import { Link } from 'react-router';
import moment from 'moment';
import _get from 'lodash/get';
import { Table } from '@/rsuite';

const { Column, HeaderCell, Cell } = Table;

function CommitMessageCell({ rowData, dataKey = 'commit.message', ...props }) {
  return (
    <Cell {...props}>
      <Link to={rowData.route_path}>{rowData.commit.message}</Link>
      <p>
        <small>{rowData.committer.login} committed on {moment(rowData.commit.committer.date).format('ll')} </small>
      </p>
    </Cell>
  );
}

function CommitRevisionCell({ rowData, dataKey = 'sha', ...props }) {
  return (
    <Cell {...props}>
      <Link to={rowData.route_path}>
        {rowData.sha.substr(0, 7)}
      </Link>
    </Cell>
  );
}

function CommitsTable(props) {
  return (
    <Table rowHeight={66} {...props}>
      <Column flexGrow={1}>
        <HeaderCell>Commit message</HeaderCell>
        <CommitMessageCell dataKey="commit.message" />
      </Column>
      <Column width={120}>
        <HeaderCell>Revision</HeaderCell>
        <CommitRevisionCell dataKey="sha" />
      </Column>
    </Table>
  )
}

export default CommitsTable;
