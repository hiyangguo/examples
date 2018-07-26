import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Component from './index';
import * as actionCreator from './actionCreator';
/* Selectors */
import { createSelectors } from './reducer';

function mapState2Props(state) {
  const selectors = createSelectors(state);
  return {
    loginData: selectors.loginData()
  };
}


function mapDispatch2Props(dispatch) {
  const actions = bindActionCreators(
    Object.assign({}, actionCreator),
    dispatch
  );
  return {
    onLogin: actions.login,
    onFetchBasicConfig: actions.fetchBasicConfig
  };
}

export default connect(mapState2Props, mapDispatch2Props)(Component);
