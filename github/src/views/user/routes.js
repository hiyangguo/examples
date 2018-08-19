module.exports = {
  path: ':login',
  title: 'User',
  component: require('./Layout'),
  indexRoute: {
    getComponent({ location: { query: { tab = 'overview' } } }, cb) {
      switch (tab) {
        case 'repositories':
          cb(null, require('./repos'));
          break;

        default:
          cb(null, require('./repos'));
          break;
      }
    }
  }
};
