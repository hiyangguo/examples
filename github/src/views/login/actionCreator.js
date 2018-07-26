import * as ActionTypes from '@/constants/ActionTypes';
import { API_LOGIN } from '@/constants/APIs';
import { POST, createFetchAction } from '@/utils/request';

/**
 * 登录
 */
export function login(data, callback) {
  return POST(API_LOGIN, {
    disabledNotification: true,
    data,
    action: createFetchAction(ActionTypes.LOGIN),
    success: (response) => {
      callback && callback(response);
    }
  });
}


/**
 * 获取基本信息
 * @param callback
 */
export function fetchBasicConfig(userInfo, callback) {
  sessionStorage.setItem('profile', encodeURIComponent(JSON.stringify(userInfo)));
  callback && callback(userInfo);
  return dispatch => dispatch({
    type: ActionTypes.FETCH_BASIC_CONFIG
  });
}
