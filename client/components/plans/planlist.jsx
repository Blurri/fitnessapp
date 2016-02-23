PlanList = React.createClass({
  mixins : [EnsureAuthenticated,ReactMeteorData],
  getMeteorData() {
    let data = {};
    let handle = Meteor.subscribe('allPlans');
    if(handle.ready()){
      data.plans = Plans.find().fetch();
    }
    return data;
  },

  getContent() {
    return(
      <div className="row">
        <div className="col-md-12">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Edit</th>
                <th>Training</th>
                <th>Stats</th>
              </tr>
            </thead>
            <tbody>
              {this.data.plans.map((plan, index) => (
                <tr key={plan._id}>
                  <td>{index+1}</td>
                  <td>{plan.title}</td>
                  <td>
                    <a href={'/edit-plan/'+plan._id}><i className="fa fa-eye"></i></a>
                  </td>
                  <td>
                    <a href="#" onClick={this.createNewTraining.bind(this,plan)} ><i className="fa fa-step-forward"></i></a>
                  </td>
                  <td>
                     <a href={'/stats/'+plan._id}><i className="fa fa-tasks"></i></a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  },
  render() {
    return (
      <div>
        {this.data.plans ? this.getContent():<p>Loading ...</p>}
      </div>
    )
  },
  createNewTraining(plan,event){
    event.preventDefault();
    Meteor.call('newtraining', {planId:plan._id}, (err, res) => {
      if(err){
      //HANDLE ERR
        return err;
      }
      FlowRouter.go('/training/'+res);
    })
  }
})
