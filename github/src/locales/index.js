const r = require.context('../../locales', false, /\.json$/);

function flatten(obj, namespace) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const path = namespace ? `${namespace}.${key}` : key;
    return typeof value === 'object' ? {
      ...acc,
      ...flatten(value, path)
    } : {
      ...acc,
      [path]: value
    };
  }, {});
}

const locales = r.keys().reduce((acc, key) => {
  const locale = key.match(/^\.\/([\w-]+?)\.json$/)[1];
  return {
    ...acc,
    [locale]: flatten(r(key))
  };
}, {});

export default locales;
