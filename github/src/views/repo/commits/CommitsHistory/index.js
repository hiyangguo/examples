import React from 'react';
import { Panel, Dropdown, Timeline } from 'rsuite';
import Octicon from '@/components/Octicon';

function CommitsHistory({ commits = [] }) {
  return (
    <Timeline>
      {
        commits.map((commit, index) => (
          <Timeline.Item
            key={index}
            dot={
              <Octicon
                name="git-commit"
                style={{ position: 'relative', left: -3, backgroundColor: '#fff', color: '#d9d9d9' }}
              />
            }
          >
            <Panel bordered>
              {commit.commit.message}
            </Panel>
          </Timeline.Item>
        ))
      }
    </Timeline>
  )
}

export default CommitsHistory;
