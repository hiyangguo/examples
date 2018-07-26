/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Error.less';

const propTypes = {
  code: PropTypes.string
};


class Error extends Component {
  render() {
    const { code } = this.props;
    return (
      <div className="error-wrapper">

      </div>
    );
  }
}

Error.propTypes = propTypes;

export default Error;
