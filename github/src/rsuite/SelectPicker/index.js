import React from 'react';
import classnames from 'classnames';
import { SelectPicker as RsSelectPicker } from 'rsuite';
import './style.less';

const SelectPicker = ({ inline = true, ...props }) => (
  <RsSelectPicker
    className={classnames({ block: !inline })}
    menuClassName={classnames({ block: !inline })}
    {...props}
  />
);

export default SelectPicker;
