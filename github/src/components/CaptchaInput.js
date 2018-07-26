/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Icon } from 'rsuite';
import WithAddon from '@/hocs/WithAddon';
import _ from 'lodash';

const AddOnInput = WithAddon(Input);

const styles = {
  captchaImg: {
    position: 'absolute',
    left: 197,
    top: 1,
    borderRadius: '0 6px 6px 0'
  }
};

const propTypes = {
  src: PropTypes.string,
  onClick: PropTypes.func
};

class CaptchaInput extends Component {
  render() {
    const { src, onClick } = this.props;
    const props = _.omit(this.props, Object.keys(propTypes));
    return (
      <AddOnInput {...props} wrapClassName="captcha-input">
        <Icon icon="lock" />
        <img alt="验证码" style={styles.captchaImg} src={src} onClick={onClick} />
      </AddOnInput>
    );
  }
}

CaptchaInput.propTypes = propTypes;

export default CaptchaInput;
