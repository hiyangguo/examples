import React from 'react';
import { Sidebar, Sidenav } from 'rsuite';
import './AppsBar.less';
import SvgSprite from '@/components/SvgSprite';

function AppsBar({ apps = [] }) {
  return (
    <Sidebar
      className="appsbar"
      width={46}
    >
      <Sidenav appearance="subtle">
        <Sidenav.Header>
          <SvgSprite id="rsuite" />
        </Sidenav.Header>
        <Sidenav.Body>

        </Sidenav.Body>
      </Sidenav>
    </Sidebar>
  );
}

export default AppsBar;
