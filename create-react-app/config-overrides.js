const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  config = rewireLess.withLoaderOptions({
    modifyVars: { '@base-color': '#f44336' },
    javascriptEnabled: true
  })(config, env);

  return config;
};
