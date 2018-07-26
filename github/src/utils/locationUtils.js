import browserHistory from '@/constants/History';
import ResponseStatus from '@/constants/ResponseStatus';
import * as env from '@/utils/env';

// 判断是否登录
export function getUserProfile() {
  const profile = localStorage.getItem('profile');
  return JSON.parse(decodeURIComponent(profile));
}

// 移除登录信息
export function removeUserProfile() {
  localStorage.removeItem('profile');
}

// 设置登录信息
export function setUserProfile(profile) {
  if (profile) {
    localStorage.setItem('profile', encodeURIComponent(JSON.stringify(profile)));
    return;
  }
  removeUserProfile();
}

// 跳转到首页
export function goHomePage(profile = getUserProfile(), replace = browserHistory.replace) {
  if (!profile) {
    replace('/login');
    return;
  }
  replace('/projects');
}

// 跳转到错误页面
export function goErrorPage(code = '404', replace = browserHistory.replace) {
  replace(`/error?code=${code}`);
}

// 登出
export function logOut() {
  removeUserProfile();
  env.setItem(null);
}
