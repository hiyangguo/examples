import React, { Fragment } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import { Table } from '@/rsuite';
import Octicon from '@/components/Octicon';
import _get from 'lodash/get';

const { Column, HeaderCell, Cell } = Table;

function RepoNameCell({ rowData, dataKey = 'name', ...props }) {
  const { name, fork, language, stargazers_count, forks_count, license } = rowData;
  return (
    <Cell {...props}>
      <Link to={rowData.route_path}>
        <Octicon name={fork ? 'repo-forked' : 'repo'} />
        {name}
      </Link>
      <p>
        {
          language &&
          <small>
            {language}
          </small>
        }
        {
          stargazers_count > 0 &&
          <small>
            <Octicon name="star" />
            {stargazers_count}
          </small>
        }
        {
          forks_count > 0 &&
          <small>
            <Octicon name="repo-forked" />
            {forks_count}
          </small>
        }
        {
          license && license.spdx_id &&
          <small>
            <Octicon name="law" />
            {license.spdx_id}
          </small>
        }
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

function RepoTable(props) {
  return (
    <Fragment>
      <Table rowHeight={66} {...props}>
        <Column flexGrow={1}>
          <HeaderCell>Name</HeaderCell>
          <RepoNameCell dataKey="name" />
        </Column>
        <Column width={140} align="right" sortable>
          <HeaderCell>Created at</HeaderCell>
          <DateCell dataKey="created_at" />
        </Column>
        <Column width={140} align="right" sortable>
          <HeaderCell>Updated at</HeaderCell>
          <DateCell dataKey="updated_at" />
        </Column>
      </Table>
    </Fragment>
  )
}

export default RepoTable;
