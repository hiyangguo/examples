import React, { Children } from 'react';
import classnames from 'classnames';
import { Input, Button, SelectPicker } from 'rsuite';
import './index.less';

function DropdownInput(
  {
    className,
    style,
    title,
    activeKey,
    onSelect,
    children,
    ...props
  }
) {
  const data = Children.map(children, child => {
    return {
      label: child.props.children,
      value: child.props.eventKey
    };
  });
  return (
    <div className={classnames('dropdown-input', className)} style={style}>
      <SelectPicker
        cleanable={false}
        searchable={false}
        appearance="subtle"
        placeholder={title}
        onChange={onSelect}
        data={data}
        value={activeKey}
      />
      <Input {...props} />
    </div>
  );
}

export default DropdownInput;
