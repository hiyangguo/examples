module.exports = {
  path: ':owner/:name',
  component: require('./Layout'),
  indexRoute: {
    title: 'Repository',
    component: require('./index')
  },
  childRoutes: [
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
      path: '*'
    }
  ]
};
