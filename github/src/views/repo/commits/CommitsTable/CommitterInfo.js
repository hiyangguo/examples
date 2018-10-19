import React from 'react';
import { connect } from 'react-redux';
import { Panel } from 'rsuite';
import { selectUser } from '@/redux/selectors';
import ToJS from '@/hocs/ToJS';

function CommitterInfo({ user }) {
  return (
    <div>
      <img src={user.avatar_url} alt="" width={40} height={40} />
    </div>
  );
}

export default connect(
  (state, { login }) => ({
    user: selectUser(state)(login)
  })
)(ToJS(CommitterInfo));
