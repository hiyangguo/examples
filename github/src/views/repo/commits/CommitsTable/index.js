import React, { Fragment } from 'react';
import { Whisper, Popover } from 'rsuite';
import { Link } from 'react-router';
import moment from 'moment';
import { Table } from '@/rsuite';
import CommitterInfo from '@/views/repo/commits/CommitsTable/CommitterInfo';

const { Column, HeaderCell, Cell } = Table;

function CommitterName({ login }) {
  return (
    <Whisper
      placement="top"
      trigger="click"
      speaker={
        <Popover>
          <CommitterInfo login={login} />
        </Popover>
      }
    >
      <Link role="button" tabIndex={-1}>{login}</Link>
    </Whisper>
  );
}

function CommitMessageCell({ rowData, dataKey = 'commit.message', ...props }) {

  function renderCommitterName() {
    const { author, committer } = rowData;

    if (author.login === committer.login || committer.login === 'web-flow') {
      return (
        <Fragment>
          <CommitterName login={author.login} />
          {' committed on '}
        </Fragment>
      );
    }

    return (
      <Fragment>
        <CommitterName login={author.login} />
        {' authored and '}
        <CommitterName login={committer.login} />
        {' committed on '}
      </Fragment>
    );
  }

  return (
    <Cell {...props}>
      <Link to={rowData.route_path}>{rowData.commit.message}</Link>
      <p>
        <small>
          {renderCommitterName()}
          {moment(rowData.commit.committer.date).format('ll')}
        </small>
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
  );
}

export default CommitsTable;
