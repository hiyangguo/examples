import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Table, Icon } from 'rsuite';
import { updateEntities } from '@/redux/modules/entities';
import { selectIssue, selectRepo } from '@/redux/selectors';
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
    this.fetchIssue();
  }

  fetchIssue() {
    const { dispatch, params: { owner, name, number } } = this.props;
    return axios(`/repos/${owner}/${name}/issues/${number}`)
      .then(({ data }) => {
        const { entities } = normalize({ full_name: `${owner}/${name}`, issues: [data] }, Entity.Repository);
        dispatch(updateEntities(entities));
      });
  }

  render() {
    const { issue } = this.props;
    return (
      <div style={{ padding: '0 30px' }}>
        {
          issue &&
          <Fragment>
            <h2>{issue.title}</h2>
          </Fragment>
        }
      </div>
    );
  }
}

module.exports = connect(
  (state, { params: { owner, name, number } }) => ({
    repository: selectRepo(state)(owner, name),
    issue: selectIssue(state)(`${owner}/${name}#${number}`),
  }),
)(ToJS(RepoIssues));
