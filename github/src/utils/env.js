export function setItem(env) {
  sessionStorage.setItem('ENV', encodeURIComponent(JSON.stringify(env)));
}

export function getItem(key) {
  const env = JSON.parse(decodeURIComponent(sessionStorage.getItem('ENV'))) || {};
  if (key !== undefined) {
    return env[key];
  }
  return env;
}

export default getItem;
