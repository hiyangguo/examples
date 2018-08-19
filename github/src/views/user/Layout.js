import React, { PureComponent } from 'react';
import { Nav } from 'rsuite';
import { Link } from 'react-router';
import connect from 'react-redux/es/connect/connect';
import { selectUser } from '@/redux/selectors';
import ToJS from '@/hocs/ToJS';
import { bindActionCreators } from 'redux';
import { fetchUser } from '@/redux/actions';

function NavTab(props) {
  return <Nav.Item componentClass={Link} {...props} />;
}

class UserLayout extends PureComponent {

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser() {
    return this.props.onFetchUser();
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

function mapState2Props(state, { params: { login } }) {
  return {
    user: selectUser(state)(login)
  }
}

function mapDispatch2Props(dispatch, { location, params: { login } }) {
  const actions = bindActionCreators({
    fetchUser
  }, dispatch);

  const onFetchUser = params =>
    actions.fetchUser(login, params);

  return {
    onFetchUser
  }
}

module.exports = connect(
  mapState2Props,
  mapDispatch2Props
)(ToJS(UserLayout));
