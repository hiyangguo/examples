import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { FlexboxGrid, Panel, Form, Input, Button } from 'rsuite';
import { LoginModel } from '@/constants/form/models';
import CustomField from '@/components/Fields/CustomField';
import WithIcon from '@/hocs/WithIcon';
import ResponseStatus from '@/constants/ResponseStatus';
import { goHomePage, setUserProfile } from '@/utils/locationUtils';
import { API_CAPTCHA_JPG } from '@/constants/APIs';

const LoginInput = WithIcon(Input);

const getNewCaptchaSrc = () => `${API_CAPTCHA_JPG}?${Date.now()}`;

const propTypes = {
  loginData: PropTypes.object,
  onLogin: PropTypes.func,
  onFetchBasicConfig: PropTypes.func
};

class Component extends React.Component {
  static get displayName() {
    return 'Login';
  }

  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      formError: {},
      captcha: getNewCaptchaSrc()
    };
  }

  setFormError = formError => this.setState({ formError });

  bindForm = (ref) => {
    this.form = ref;
  };

  handleFormChange = (formData) => {
    this.setState({ formData });
  };

  handleFormCheck = (formError) => {
    this.setFormError(formError);
  };

  handleClearErrorInfo = name => () => {
    const { formError } = this.state;
    this.setFormError(_.set(formError, name, null));
  };

  handleSubmit = () => {
    const { onLogin, onFetchBasicConfig } = this.props;
    const { formData } = this.state;
    if (!this.form.check()) {
      return;
    }
    // Login
    onLogin(formData, (response) => {
      if (response.status === ResponseStatus.SUCCESS) {
        // 登录成功后将用户信息设置到 session 中
        setUserProfile(response);
        onFetchBasicConfig(response.response, (userInfo) => {
          goHomePage(userInfo);
        });
        return;
      }
      this.setState({
        formError: response.errors
      });
    });
  };

  updateCaptcha = () => {
    const { formData } = this.state;
    this.setState({
      formData: Object.assign(formData, { captcha: '' }),
      captcha: getNewCaptchaSrc()
    });
  };

  render() {
    const { loginData } = this.props;
    const { formData, formError } = this.state;
    return (
      <FlexboxGrid className="login-flex-grid" justify="center" align="middle">
        <FlexboxGrid.Item className="login-flex-item" colSpan={12}>
          <Panel className="login-panel" bordered>
            <Form
              fluid
              model={LoginModel}
              value={formData}
              errors={formError}
              ref={this.bindForm}
              onChange={this.handleFormChange}
              onCheck={this.handleFormCheck}
            >
              <CustomField
                name="username"
                checkTrigger="blur"
                accepter={LoginInput}
                icon="user"
                type="text"
                placeholder="邮箱"
                maxLength={50}
                error={formError.username}
                onFocus={this.handleClearErrorInfo('username')}
              />

              <CustomField
                name="password"
                checkTrigger="blur"
                accepter={LoginInput}
                icon="lock"
                type="password"
                placeholder="密码"
                maxLength={50}
                error={formError.password}
                onFocus={this.handleClearErrorInfo('password')}
              />

              <Button
                block
                appearance="primary"
                loading={loginData.status === ResponseStatus.REQUEST}
                onClick={this.handleSubmit}
              >
                登录
              </Button>
            </Form>
          </Panel>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    );
  }
}

Component.propTypes = propTypes;

export default Component;
