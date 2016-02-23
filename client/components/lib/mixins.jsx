EnsureAuthenticated = {
  componentWillMount() {
    if(!Meteor.user() && FlowRouter._current.path !== '/login') {
      FlowRouter.go('/');
    }
  }
};
