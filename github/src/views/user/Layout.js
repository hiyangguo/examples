import React, { PureComponent } from 'react';
import { Nav } from 'rsuite';
import { Link } from 'react-router';
import axios from 'axios';
import { normalize } from 'normalizr';
import { updateEntities } from '@/redux/modules/entities';
import * as Entity from '@/constants/Entities';
import connect from 'react-redux/es/connect/connect';
import { selectUser } from '@/redux/selectors';
import ToJS from '@/hocs/ToJS';
import Octicon from '@/components/Octicon';

function NavTab(props) {
  return <Nav.Item componentClass={Link} {...props} />;
}

class UserLayout extends PureComponent {

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser() {
    const { dispatch, params: { login } } = this.props;
    return axios(`/users/${login}`)
      .then(({ data }) => {
        const { result, entities } = normalize(data, Entity.User);
        dispatch(updateEntities(entities));
      });
  }

  render() {
    const { children, user, params: { login }, location: { query: { tab } } } = this.props;
    const userUrl = user ? user.route_path : `/${login}`;
    const tabUrl = tabName => `${userUrl}?tab=${tabName}`;

    return (
      <div className="page-content">
        <Nav
          appearance="subtle"
        >
          <NavTab
            to={userUrl}
            active={!tab}
          >
            Overview
          </NavTab>
          <NavTab
            to={tabUrl('repositories')}
            active={tab === 'repositories'}
          >
            Repositories
          </NavTab>
          <NavTab
            to={tabUrl('stars')}
            active={tab === 'stars'}
          >
            Stars
          </NavTab>
          <NavTab
            to={tabUrl('followers')}
            active={tab === 'followers'}
          >
            Followers
          </NavTab>
          <NavTab
            to={tabUrl('following')}
            active={tab === 'following'}
          >
            Following
          </NavTab>
        </Nav>
        {
          user &&
          <div className="user-content">
            {children}
          </div>
        }
      </div>
    );
  }
}

module.exports = connect(
  (state, { params: { login } }) => ({
    user: selectUser(login)(state),
  }),
)(ToJS(UserLayout));
