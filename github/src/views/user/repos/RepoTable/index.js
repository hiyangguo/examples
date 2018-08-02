import React from 'react';
import { Icon } from 'rsuite';
import { Link } from 'react-router';
import moment from 'moment';
import _get from 'lodash/get';
import { Table } from '@/rsuite';

const { Column, HeaderCell, Cell } = Table;

function RepoNameCell({ rowData, dataKey = 'name', ...props }) {
  const { name, fork } = rowData;
  return (
    <Cell {...props}>
      <Link to={rowData.route_path}>{name}</Link>
      {
        fork &&
        <p>
          <small>Forked</small>
        </p>
      }
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
