import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'rsuite';

const propTypes = {
  name: PropTypes.string,
  message: PropTypes.string,
  label: PropTypes.string,
  accepter: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.object])
};

class CustomField extends Component {
  render() {
    const { name, message, label, accepter, error, ...props } = this.props;
    return (
      <FormGroup className={error ? 'has-error' : ''}>
        {label && <ControlLabel>{label} </ControlLabel>}
        <FormControl name={name} accepter={accepter} {...props} errorMessage={error} />
        <HelpBlock>{message}</HelpBlock>
      </FormGroup>
    );
  }
}

CustomField.propTypes = propTypes;

export default CustomField;
