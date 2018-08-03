import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import { Table } from '@/rsuite';
import Octicon from '@/components/Octicon';

const { Column, HeaderCell, Cell } = Table;

function RepoNameCell({ rowData, dataKey = 'name', ...props }) {
  const { name, fork, updated_at } = rowData;
  return (
    <Cell {...props}>
      <Link to={rowData.route_path}>
        <Octicon name={fork ? 'repo-forked' : 'repo'} />
        {name}
      </Link>
      <p>
        <small>Updated {moment(updated_at).fromNow()}</small>
      </p>
    </Cell>
  );
}

function RepoTable(props) {
  return (
    <Table rowHeight={66} {...props}>
      <Column flexGrow={1}>
        <HeaderCell>Name</HeaderCell>
        <RepoNameCell dataKey="name" />
      </Column>
      <Column width={180}>
        <HeaderCell>Language</HeaderCell>
        <Cell dataKey="language" />
      </Column>
    </Table>
  )
}

export default RepoTable;
