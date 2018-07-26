import React from 'react';
import { Sidebar, Sidenav } from 'rsuite';
import './AppsBar.less';

function AppsBar({ apps = [] }) {
  return (
    <Sidebar
      className="appsbar"
      width={46}
    >
      <Sidenav appearance="subtle">
        <Sidenav.Header>
          <img src="/resources/img/hypers-logo.jpg" alt="HYPERS" />
        </Sidenav.Header>
        <Sidenav.Body>

        </Sidenav.Body>
      </Sidenav>
    </Sidebar>
  );
}

export default AppsBar;
