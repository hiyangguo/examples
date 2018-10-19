module.exports = {
  path: ':owner/:name',
  title: 'Repository',

  component: require('./Layout'),
  indexRoute: {
    component: require('./readme')
  },
  childRoutes: [
    {
      path: 'commits',
      childRoutes: [
        {
          path: ':sha',
          component: require('./commits')
        }
      ]
    },
    {
      path: 'commit/:sha',
      component: require('./commits/detail')
    },
    {
      path: 'issues',
      indexRoute: {
        component: require('./issues')
      },
      childRoutes: [
        {
          path: ':number',
          component: require('./issue-comments')
        }
      ]
    },
    {
      path: 'pulls',
      component: require('./issues')
    }
  ]
};
