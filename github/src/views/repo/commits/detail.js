import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ToJS from '@/hocs/ToJS';
import { selectCommit } from '@/redux/selectors';
import { fetchCommit } from '@/redux/actions';

class CommitDetail extends PureComponent {
  componentDidMount() {
    this.fetchCommit();
  }

  fetchCommit() {
    return this.props.onFetchCommit();
  }

  render() {
    return (
      <div />
    );
  }
}

module.exports = connect(
  (state, { params: { owner, name, sha } }) => ({
    commit: selectCommit(state)(owner, name, sha)
  }),
  (dispatch, { params: { owner, name, sha } }) => ({
    onFetchCommit() {
      return dispatch(fetchCommit(owner, name, sha));
    }
  })
)(ToJS(CommitDetail));
