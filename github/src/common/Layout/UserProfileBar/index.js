import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { ButtonToolbar, Icon, Popover, Whisper, ButtonGroup, Button, Tooltip } from 'rsuite';
import ToJS from '@/hocs/ToJS';
import { getAuthUser } from '@/redux/selectors';

function Avatar({ size = 40, ...props }) {
  const style = {
    width: size,
    height: size,
    borderRadius: '50%'
  };
  return (
    <img {...props} style={style} />
  );
}

function UserProfileBar({ authUser }) {

  function handleLogOut() {
    location.href = '/logout';
  }

  function renderPopover() {
    return (
      <Popover className="user-profile-menu">
        <div className="user-profile-menu-header">
          <Avatar src={authUser.avatar_url} className="user-profile-avatar" />
          <div className="user-profile-info">
            <div className="username">
              Signed in as
            </div>
            <div className="email">
              <b>{authUser.login}</b>
            </div>
          </div>
        </div>
        <div className="user-profile-menu-footer">
          <ButtonToolbar className="user-profile-actions">
            <ButtonGroup justified>
              <Button appearance="subtle" onClick={handleLogOut}>
                <Icon icon="power-off" fixedWidth />
                <FormattedMessage id="components.user-menu.actions.logout" />
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
  })
)(ToJS(UserProfileBar));
