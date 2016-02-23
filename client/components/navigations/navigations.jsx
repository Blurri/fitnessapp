
Navigations = React.createClass({
  mixins : [ReactMeteorData],
  getMeteorData() {
    return {
      currentUser: Meteor.user()
    }
  },
  logout(event){
    event.preventDefault();
    AccountsTemplates.logout();
    FlowRouter.go('/');
  },
  render() {



      return (
        <nav className="navbar navbar-light bg-faded top-nav">
          <a className="navbar-brand" href="/">FitnessApp</a>
          {this.data.currentUser ?
            <ul className="nav navbar-nav">
              <Navigation href="/plans" title="Plans" id="planlink" />
              <Navigation href="/exercises" title="Exercises" id="exerciselink" />
              <Navigation href="/new-plan" title="New Plan" id="newplanlink" />
              <Navigation href="/new-exercise" title="New Exercise" id="newexerciselink" />
              <li className="nav-item">
                <a href="" className="nav-link" onClick={this.logout}>Logout</a>
              </li>
            </ul>
            :
            <ul className="nav navbar-nav">
              <Navigation href="/login" title="Login"  id="loginlink"/>
            </ul>
          }
        </nav>
      )
  }
})
