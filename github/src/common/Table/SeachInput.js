import React from 'react';
import PropTypes from 'prop-types';
import { SelectPicker, InputGroup, Input, Icon } from 'rsuite';
import _ from 'lodash';

const propTypes = {
  filterProps: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    }))
  }),
  onChange: PropTypes.func
};

const defaultProps = {
  filterProps: {}
};

class Component extends React.Component {
  static get displayName() {
    return 'SearchInput';
  }

  render() {
    const { filterProps,  onChange } = this.props;
    const props = _.omit(this.props, Object.keys(propTypes));
    return (
      <div className="pull-right">
        {filterProps && (<SelectPicker{...filterProps} />)}
        <InputGroup style={{ display: 'inline-block', width: 200, verticalAlign: 'middle' }} inside {...props}>
          <Input onChange={onChange} />
          <InputGroup.Addon>
            <Icon icon="search" />
          </InputGroup.Addon>
        </InputGroup>
      </div>
    );
  }
}

Component.propTypes = propTypes;
Component.defaultProps = defaultProps;
export default Component;
