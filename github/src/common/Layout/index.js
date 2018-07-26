import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Container, Content } from 'rsuite';
import { FormattedMessage } from 'react-intl';

import ToJS from '@/hocs/ToJS';
import { getAuthUser } from '@/redux/selectors';

import Sidebar from './Sidebar';
import UserProfileBar from './UserProfileBar';


class Layout extends PureComponent {
  state = {
    expandSidebar: true
  };

  toggleSidebar = () =>
    this.setState(({ expandSidebar }) => ({
      expandSidebar: !expandSidebar
    }));

  render() {
    const { expandSidebar } = this.state;
    const { routes, authUser } = this.props;
    const pageTitle = routes.reduce((acc, { title = acc }) => title, 'name');
    return (
      <Container>
        <Sidebar
          apps={authUser && authUser.apps || []}
          expand={expandSidebar}
          onToggle={this.toggleSidebar}
        />
        <Container style={{ overflowY: 'auto' }}>
          {authUser && <UserProfileBar />}
          <Content className="main-content">
            {
              pageTitle &&
              <div className="page-title">
                <FormattedMessage id={pageTitle} defaultMessage={pageTitle} />
              </div>
            }
            {this.props.children}
          </Content>
        </Container>
      </Container>
    );
  }
}

function mapState2Props(state) {
  return {
    authUser: getAuthUser(state)
  };
}

export default connect(
  mapState2Props
)(ToJS(Layout));
