// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Sidebar as RsSidebar, Sidenav, Icon, Nav, Navbar } from 'rsuite';
import classnames from 'classnames';
import { Link } from 'react-router';
import setDisplayName from 'recompose/setDisplayName';
import AppsBar from '@/common/Layout/Sidebar/AppsBar';
import { getAuthUser } from '@/redux/selectors';
import ToJS from '@/hocs/ToJS';
import SvgSprite from '@/components/SvgSprite';
// import Octicon, { GitPullRequest, IssueOpened } from '@githubprimer/octicons-react';
import Octicon from '@/components/Octicon';

const styles = {
  sideBar: {
    display: 'flex',
    flexDirection: 'column',
  },
  appsDropdownImg: { marginRight: 10, verticalAlign: 'middle' },
  headerImg: { maxWidth: 56 },
};

type Props = {
  apps: Array<Object>,
  expand: boolean,
  onToggle: () => void
};

function Sidebar({ expand, onToggle, authUser }: Props) {
  const sidebarWidth = expand ? (250 - 46) : 56;

  const { apps = [], permissions = [] } = authUser;
  return (
    <div className="sidebar">
      {
        expand &&
        <AppsBar apps={apps} />
      }
      <RsSidebar
        appearance="subtle"
        className={classnames('main-side-bar', { fold: !expand })}
        style={styles.sideBar}
        width={sidebarWidth}
      >
        <Sidenav.Header
          className="main-side-bar-header"
        >
          {
            !expand &&

            <Link to="/">
              <SvgSprite id="rsuite" />
            </Link>
          }
          {
            expand &&
            <Link to="/">
              GitHub in RSUITE
            </Link>
          }
        </Sidenav.Header>
        <Sidenav
          className="main-side-bar-body"
          expanded={expand}
          appearance="subtle"
        >
          <Sidenav.Body>
            <Nav>
              <Nav.Item
                componentClass={Link}
                to="/pulls"
                icon={<Octicon name="git-pull-request" />}
              >
                Pull requests
              </Nav.Item>
              <Nav.Item
                componentClass={Link}
                to="/pulls"
                icon={<Octicon name="issue-opened" />}
              >
                Issues
              </Nav.Item>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
        <Navbar appearance="subtle" className="nav-toggle">
          <Navbar.Body>
            <Nav>
              <Nav.Item
                className="toggle-button"
                onClick={onToggle}
                style={{ width: sidebarWidth, textAlign: 'right' }}
              >
              <span style={{ display: 'inline-block', width: 24, height: 20, textAlign: 'center' }}>
                <Icon icon={expand ? 'angle-left' : 'angle-right'} />
              </span>
              </Nav.Item>
            </Nav>
          </Navbar.Body>
        </Navbar>
      </RsSidebar>
    </div>
  );
}

export default setDisplayName('Sidebar')(connect(
  state => ({
    authUser: getAuthUser(state),
  }),
)(ToJS(Sidebar)));
