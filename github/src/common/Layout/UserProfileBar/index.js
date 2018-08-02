import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { ButtonToolbar, Icon, Popover, Whisper, ButtonGroup, Button, Tooltip, Dropdown } from 'rsuite';
import ToJS from '@/hocs/ToJS';
import { getAuthUser } from '@/redux/selectors';

function Avatar({ size = 40, ...props }) {
  const style = {
    width: size,
    height: size,
    borderRadius: '50%',
  };
  return (
    <img {...props} style={style} />
  );
}

function UserProfileBar({ authUser }) {

  function handleLogOut() {
    //  clear stored credentials
  }

  function renderPopover() {
    return (
      <Popover className="user-profile-menu">
        <div className="user-profile-menu-header">
          <Avatar src={authUser.avatar_url} className="user-profile-avatar" />
          <div className="user-profile-info">
            <div className="username">
              {authUser.name || 'Signed in as'}
            </div>
            <div className="email">
              {authUser.login}
            </div>
          </div>
        </div>
        <Dropdown.Menu className="user-profile-menu-links">
          <Dropdown.Item componentClass={Link} to={`/${authUser.login}`}>
            Your profile
          </Dropdown.Item>
          <Dropdown.Item componentClass={Link} to={`/${authUser.login}?tab=repositories`}>
            Your repositories
          </Dropdown.Item>
          <Dropdown.Item componentClass={Link} to={`/${authUser.login}?tab=stars`}>
            Your stars
          </Dropdown.Item>
          <Dropdown.Item href="https://gist.github.com">
            Your gists
          </Dropdown.Item>
        </Dropdown.Menu>
        <div className="user-profile-menu-footer">
          <ButtonToolbar className="user-profile-actions">
            <ButtonGroup justified>
              <Button appearance="subtle" componentClass={Link} to="/settings/profile">
                <Icon icon="cog" fixedWidth />
                Settings
              </Button>
              <Button appearance="subtle" onClick={handleLogOut}>
                <Icon icon="power-off" fixedWidth />
                Sign out
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </div>
      </Popover>
    );
  }

  function renderTrigger() {
    return (
      <Whisper
        placement="left"
        speaker={<Tooltip>{authUser.name}</Tooltip>}
      >
        <Avatar src={authUser.avatar_url} size={20} className="user-profile-thumb" />
      </Whisper>
    );
  }

  return (
    <ButtonToolbar className="user-profile-button-toolbar">
      <Whisper
        placement="bottomRight"
        trigger="click"
        speaker={renderPopover()}
      >
        {renderTrigger()}
      </Whisper>
    </ButtonToolbar>
  );
}

export default connect(
  state => ({
    authUser: getAuthUser(state),
  }),
)(ToJS(UserProfileBar));
