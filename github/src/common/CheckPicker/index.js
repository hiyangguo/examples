import React from 'react';
import classnames from 'classnames';
import { CheckPicker as RsCheckPicker } from 'rsuite';
import './style.less';

const CheckPicker = ({ inline = true, ...props }) => {
  const { labelKey = 'label' } = props;

  return (
    <RsCheckPicker
      className={classnames({ block: !inline })}
      menuClassName={classnames({ block: !inline })}
      renderValue={(values, items) => items.map(item => item[labelKey]).join('、')}
      {...props}
    />
  );
};

export default CheckPicker;
