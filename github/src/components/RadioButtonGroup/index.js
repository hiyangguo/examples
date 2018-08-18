import React, { Children, cloneElement } from 'react';
import classnames from 'classnames';
import { ButtonGroup } from 'rsuite';
import _attempt from 'lodash/attempt';
import './index.less';

function RadioButtonGroup({ className, children, activeKey, onSelect, ...props }) {
  return (
    <ButtonGroup className={classnames('radio-button-group', className)} {...props} >
      {
        activeKey ?
          Children.map(children, (button) => {
            return cloneElement(button, {
              active: activeKey === button.props.eventKey,
              onClick: (...args) => {
                _attempt(button.props.onClick, ...args);
                onSelect(button.props.eventKey);
              }
            })
          }) :
          children
      }
    </ButtonGroup>
  );
}

export default RadioButtonGroup;